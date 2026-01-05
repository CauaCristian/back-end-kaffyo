import * as jwt from "jsonwebtoken";
import { AccessTokenPayload } from "../interfaces/Access_Token_Payload";
import { jwtConfig } from "../configs/Jwt_Config";
import createHttpError from "http-errors";
import crypto from "crypto";
export class TokenService{

    private options: jwt.SignOptions = {algorithm: jwtConfig.algorithm,expiresIn: jwtConfig.expiresIn };
    private verifyOptions: jwt.VerifyOptions = {algorithms: [jwtConfig.algorithm]};
    private secret:string = jwtConfig.secret;

    generateAccessToken(payload: AccessTokenPayload): string {
        return jwt.sign(payload, this.secret, this.options);
    }
    generateRefreshToken(){
        return crypto.randomBytes(32).toString("hex");
    }
    generateCsrfToken(){
        return crypto.randomBytes(32).toString("hex");
    }
    verifyToken(token: string): AccessTokenPayload {
        try {

        const decoded = jwt.verify(
            token,
            this.secret,
            this.verifyOptions
        );

        if (typeof decoded === "string") {
            throw createHttpError(401, "Token inválido");
        }

        return decoded as AccessTokenPayload;

        } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw createHttpError(401, "Token expirado");
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw createHttpError(401, "Token inválido");
        }

        throw createHttpError(401, "Falha na autenticação");
        }
    }
}