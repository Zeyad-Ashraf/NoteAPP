import joi from "joi";

export const addNoteValidation = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    ownerId: joi.string().required(),
    authorization: joi.string().required(),
})

export const deleteNoteValidation = joi.object({
    id: joi.string().required(),
    authorization: joi.string().required(),
})