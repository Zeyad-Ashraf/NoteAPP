import jwt from "jsonwebtoken";

export const generateToken = async ({payload, secret, expiresIn}) => {
    return jwt.sign({...payload}, secret, {
        expiresIn,
    });
}

export const verifyToken = async ({token, secret}) => {
    return jwt.verify(token, secret);
}