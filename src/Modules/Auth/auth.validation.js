import joi from "joi";
import { generalRules } from "../../utils/index.js";

export const signUpValidation = {
    body: joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        cpassword: joi.string().valid(joi.ref("password")).required(),
    }).required()
}

export const confirmEmailValidation = {
    body: joi.object({
        email: generalRules.email.required(),
        code: joi.string().pattern(/^\d{6}$/).required().messages({
            "string.empty": "Code is required",
            "any.required": "Code is required"
        }),
    }).required()
}

export const loginValidation = {
    body: joi.object({
        email: generalRules.email.required(),
        password: joi.string().required().messages({
            "string.empty": "Password is required",
            "any.required": "Password is required"
        }),
    }).required()
}

export const logoutValidation = {
    headers: generalRules.headers.required(),
}

export const forgetPasswordValidation = {
    body: joi.object({
        email: generalRules.email.required(),
    }).required()
}

export const resetPasswordValidation = {
    body: joi.object({
        email: generalRules.email.required(),
        code: joi.string().pattern(/^\d{6}$/).required().messages({
            "string.empty": "Code is required",
            "any.required": "Code is required"
        }),
        password: generalRules.password.required(),
        cpassword: joi.string().valid(joi.ref("password")).required(),
    }).required()
}