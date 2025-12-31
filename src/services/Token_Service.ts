import * as jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/Jwt_Payload";
import { jwtConfig } from "../configs/Jwt_Config";
import createHttpError from "http-errors";

export class TokenService{

    private options: jwt.SignOptions = {algorithm: jwtConfig.algorithm,expiresIn: jwtConfig.expiresIn };
    private verifyOptions: jwt.VerifyOptions = {algorithms: [jwtConfig.algorithm]};
    private secret:string = jwtConfig.secret;

    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secret, this.options);
    }
    verifyToken(token: string): JwtPayload {
        try {
        const decoded = jwt.verify(
            token,
            this.secret,
            this.verifyOptions
        );

        if (typeof decoded === "string") {
            throw createHttpError(401, "Token inválido");
        }

        return decoded as JwtPayload;

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