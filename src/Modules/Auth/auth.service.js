import { EnumRoles, userModel } from "../../DB/models/users.model.js";
import { decodedToken, tokenType } from "../../middlewares/auth.js";
import { findOne, eventEmitter, create, hashPassword, comparePassword, generateToken, redisClient, findOneAndUpdate } from "../../utils/index.js";

export const signUp = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return next(new Error("Email and Password are required", { cause: 400 }));
    
    const user = await findOne(userModel, { email });
    if (user) {
        // Use this step to avoid User Enumeration Attack
        // By Emitting an event, to send an email to the user to reset the password
        eventEmitter.emit("EmailExists", {email});
        // Use this step to avoid Timing Attacks
        // Hash the password to make the response time consistent
        await hashPassword(password);
        return res.status(201).json({ message: "success", feedBack: "you may receive and email to confirm your account" });
    }

    // Generate OTP of 6 digits
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await hashPassword(otp.toString()); // Hash the OTP for security

    const newUser = await create(userModel, { email, password, otp: {
        code: hashedOtp,
    }, role: EnumRoles.user });

    eventEmitter.emit("confirmEmail",{email, otp});
    return res.status(201).json({ message: "success", feedBack: "you may receive and email to confirm your account" });
}


export const confirmEmail = async (req, res, next) => {
    const { email, code } = req.body;
    if(!email || !code) return next(new Error("Email and Code are required", { cause: 400 }));

    const user = await findOne(userModel, { email, confirmed: false });
    if (!user) return next(new Error("Email not exists or already Confirmed", { cause: 404 }));

    if(!await comparePassword(code, user.otp.code)) return next(new Error("Invalid Code", { cause: 400 }));

    const newUser = await userModel.findByIdAndUpdate(user._id, { confirmed: true, $unset: { otp: -1 } });

    eventEmitter.emit("confirmed",{email});
    return res.status(200).json({ message: "success", feedBack: "you may receive and email to confirm your account" });
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return next(new Error("Email and Password are required", { cause: 400 }));

    const user = await findOne(userModel, { email, confirmed: true });
    if (!user) {
        // Use this step to Time Attacks
        // Hash the password to make the response time consistent
        await hashPassword(password);
        return next(new Error("Email or Password is incorrect", { cause: 400 }));
    }

    if(!await comparePassword(password, user.password)) return next(new Error("Email or Password is incorrect", { cause: 400 }));

    // Generate Token
    let ACCESS_KEY = undefined;
    let REFRESH_KEY = undefined;

    if(user.role === EnumRoles.admin) {
        ACCESS_KEY = process.env.JWT_ACCESS_SECRET_ADMIN;
        REFRESH_KEY = process.env.JWT_REFRESH_SECRET_ADMIN;
    } else {
        ACCESS_KEY = process.env.JWT_ACCESS_SECRET_USERS;
        REFRESH_KEY = process.env.JWT_REFRESH_SECRET_USERS;
    }

    const access_token = await generateToken({
        payload: { id: user._id, email: user.email, role: user.role },
        secret: ACCESS_KEY,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });

    const refresh_token = await generateToken({
        payload: { id: user._id, email: user.email, role: user.role },
        secret: REFRESH_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return res.status(200).json({ message: "success", access_token, refresh_token, role: user.role });
}


export const logout = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return next(new Error("Authorization token is required", { cause: 400 }));

    const token = authorization.split(" ")[1];
    if(!token) return next(new Error("Invalid Authorization token", { cause: 400 }));

    // Invalidate the token (e.g., by adding it to a blacklist)
    await redisClient.set(`blacklist_${token}`, "1", { EX: 60 * 60}); // Set expiration time for the blacklist entry to 1 hour

    return res.status(200).json({ message: "success", feedBack: "You have been logged out" });
}


export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    if(!email) return next(new Error("Email is required", { cause: 400 }));

    const user = await findOne(userModel, { email });
    if (!user){
        // Use this step to avoid User Enumeration Attack
        return res.status(200).json({ message: "success", feedBack: "you may receive and email to reset your password" });
    }
    // Generate OTP of 6 digits
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await hashPassword(otp.toString()); // Hash the OTP for security

    const newUser = await userModel.findByIdAndUpdate(user._id, { otp: {
        code: hashedOtp,
    }, confirmed: false });

    eventEmitter.emit("forgetPassword",{email, otp});
    return res.status(200).json({ message: "success", feedBack: "you may receive and email to reset your password" });
}


export const resetPassword = async (req, res, next) => {
    const { email, code, password } = req.body;
    if(!email || !code || !password) return next(new Error("Email, Code and Password are required", { cause: 400 }));

    const user = await findOneAndUpdate(userModel, { email }, {password: await hashPassword(password), confirmed: true, $unset: { otp: -1 } });
    if (!user) return next(new Error("Email or Code is incorrect", { cause: 404 }));

    return res.status(200).json({ message: "success", feedBack: "Your password has been reset successfully" });
}


export const refreshToken = async (req, res, next) => {
    
    const { authorization } = req.headers;
    if(!authorization) return next(new Error("Authorization token is required", { cause: 400 }));
    const decoded = await decodedToken(authorization, tokenType.refresh, next);

    if (!decoded)
        return next(new Error("user not found", { cause: 404 }));

    let access_key= undefined;

    if (decoded.role == EnumRoles.user) {

        access_key = process.env.JWT_ACCESS_SECRET_USERS;

    } else if (decoded.role == EnumRoles.admin) {

        access_key = process.env.JWT_ACCESS_SECRET_ADMIN;

    }

    const access_token = await generateToken({
        payload: { id: decoded.id, email: decoded.email, role: decoded.role },
        secret: access_key,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });

    return res.status(200).json({ message: "success", access_token });
}


export const uploadProfilePic = async (req, res, next) => {
    if(!req.user) return next(new Error("Unauthorized or don't have permission you should subscribe", { cause: 401 }));

    const { file } = req;
    if(!file) return next(new Error("File is required", { cause: 400 }));

    await userModel.findByIdAndUpdate(req.user._id, { path: file.path });

    return res.status(200).json({ message: "success", feedBack: "Profile picture uploaded successfully" });
}