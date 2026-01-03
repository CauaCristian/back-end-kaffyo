import createHttpError from "http-errors";

export const hashConfig = (()=>{
    const salt = process.env.HASH_SALT;
    if(!salt) throw createHttpError("Configuração de hash incorreta");

    return {
        salt:salt
    }
})();