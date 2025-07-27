export const validation = (schema) => (req, res, next) => {
    let errArr = [];

    for (let key of Object.keys(schema)) {
        let validatee = schema[key].validate(req[key], { abortEarly: false });

        if (validatee?.error)
            errArr.push(validatee.error);
    }

    if (errArr.length > 0)
        return res.status(400).json({ message: errArr });

    next();
}

export const graphValidation = async ({schema, data} = {}) => {
        let validatee = schema.validate(data, { abortEarly: false });

        if (validatee?.error)
            throw new Error(validatee.error.message, { cause: 400});
}