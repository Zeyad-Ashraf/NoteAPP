
export const findOneByID = async (model, id) => {
    return await model.findById(id);
}

export const findOneByIdAndUpdate = async (model, id, data) => {
    return await model.findByIdAndUpdate(id, data);
}

export const findOneByIdAndDelete = async (model, id) => {
    return await model.findByIdAndDelete(id);
}

export const findOne = async (model, query) => {
    return await model.findOne(query);
}

export const findOneAndUpdate = async (model, query, data) => {
    return await model.findOneAndUpdate(query, data);
}

export const findOneAndDelete = async (model, query) => {
    return await model.findOneAndDelete(query);
}

export const create = async (model, data) => {
    return await model.create(data);
}

export const findAll = async (model, query) => {
    return await model.find(query);
}
