import bcrypt from "bcrypt";

export const comparePassword = async (key, hashed) => {
    return bcrypt.compareSync(key, hashed);
}