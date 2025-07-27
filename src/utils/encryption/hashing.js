import bcrypt from "bcrypt";

export const hashPassword = async (key) => {
    return bcrypt.hashSync(key, +process.env.BCRYPT_SALT_ROUNDS);
}