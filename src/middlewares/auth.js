import { userModel } from "../DB/models/users.model.js";
import { asyncHandler, findOneByID, verifyToken } from "../utils/index.js";

export const tokenType = {
    access: "access",
    refresh: "refresh"
}

export const decodedToken = async (authorization, tokenTypes, next) => {
    if(!authorization) return next(new Error("Authorization header is required", {cause: 401}));

    const [prefix, token] = authorization.split(" ");

    if(!prefix || ! token) return next(new Error("Invalid Authorization header", {cause: 401}));

    let access_key = undefined;
    let refresh_key = undefined;

    if (prefix === "Bearer") {
        access_key = process.env.JWT_ACCESS_SECRET_USERS;
        refresh_key = process.env.JWT_REFRESH_SECRET_USERS;
    } else if (prefix === "Admin") {
        access_key = process.env.JWT_ACCESS_SECRET_ADMIN;
        refresh_key = process.env.JWT_REFRESH_SECRET_ADMIN;
    } else 
        return next(new Error("invalid token", { cause: 400 }));

    const decoded = await verifyToken({token, secret: tokenTypes === tokenType.access ? access_key : refresh_key, maxAge: process.env.JWT_ACCESS_EXPIRATION});

    const user = await findOneByID(userModel, decoded.id);

    if(!user) return next(new Error("Invalid token", { cause: 401 }));

    return user;
}


export const authentication = asyncHandler(async (req, res, next) => {
    const {authorization} = req.headers;

    const user = await decodedToken(authorization, tokenType.access, next);

    req.user = user;

    next();
})


export const authorization = (accessRoles = []) => asyncHandler(async (req, res, next) => {

    if (!accessRoles.includes(req.user.role))
        return next(new Error("don't have permission to do this action", { cause: 400 }));

    next();
});


export const authGraphQL = async (authorization, accessRoles = []) => {
    if(!authorization) throw new Error("Authorization header is required", {cause: 401});

    const [prefix, token] = authorization.split(" ");

    if(!prefix || ! token) throw new Error("Invalid Authorization header", {cause: 401});

    let access_key = undefined;

    if (prefix === "Bearer") {
        access_key = process.env.JWT_ACCESS_SECRET_USERS;
    } else if (prefix === "Admin") {
        access_key = process.env.JWT_ACCESS_SECRET_ADMIN;
    } else 
        throw new Error("Invalid Authorization header", { cause: 400 });

    const decoded = await verifyToken({token, secret: access_key});

    const user = await findOneByID(userModel, decoded.id);

    if(!user) throw new Error("Invalid Authorization header", { cause: 401 });

    if(user?.changeCredentialsTime?.getTime() / 1000 < decoded.iat)
        throw new Error("Invalid Authorization header", { cause: 401 });

    if(!accessRoles.includes(user.role))
        throw new Error("don't have permission to do this action", { cause: 403 });

    return user;
}