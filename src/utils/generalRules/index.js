import joi from "joi";
import { Types } from "mongoose";

const customId = (value, helper) => {
    let valid = Types.ObjectId.isValid(value);
    return valid ? value : helper.message("invalid id");
}

export const generalRules = {
    objectId: joi.string().custom(customId).hex(),
    email: joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 2 }).messages({
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/).messages({
        "string.pattern.base":
        "Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
        "string.empty": "Password is required",
        "any.required": "Password is required"
    }),
    headers:joi.object({
        authorization: joi.string().required(),
        'cache-control':joi.string(),
        'postman-token':joi.string(),
        'content-type':joi.string(),
        'content-length':joi.string(),
        host:joi.string(),
        'user-agent':joi.string(),
        accept:joi.string(),
        'accept-encoding':joi.string(),
        connection:joi.string(),
    }),
    file: joi.object()
}