import createHttpError from "http-errors";
import * as jwt from "jsonwebtoken"

export const jwtConfig = (()=>{
    const secret = process.env.JWT_SECRET;
    const algorithm = process.env.JWT_ALGORITHM as jwt.Algorithm;
    const expiresIn = process.env.JWT_EXPIRATION as jwt.SignOptions["expiresIn"]; 

    if (!secret || !algorithm || !expiresIn) throw createHttpError(500,"Configuração de autenticação inválida");

    return {
      secret,
      algorithm,
      expiresIn
    };
})();