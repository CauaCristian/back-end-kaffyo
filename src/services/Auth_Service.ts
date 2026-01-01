import createHttpError from "http-errors";
import { LoginDTO } from "../dto/Login_DTO";
import { UserEntity } from "../entities/User_Entity";
import { UserRepository } from "../repositories/User_Repository";
import { dataSource } from "../sources/Data_Source";
import * as bcrypt from "bcryptjs";
import { TokenService } from "./Token_Service";
import { AccessTokenPayload } from "../interfaces/Jwt_Payload";
import { LoginResponse } from "../interfaces/Login_Response";
import { hashConfig } from "../configs/Hash_config";

export class AuthService{
    private userRepository = dataSource.getRepository(UserEntity).extend(UserRepository.prototype);
    private tokenService = new TokenService();
    async login (loginDTO:LoginDTO) : Promise<LoginResponse>{
        const user = await this.userRepository.findByEmail(loginDTO.email);
        if(!user) throw createHttpError(401,"Email incorreto");
        const isCorretPassword = await bcrypt.compare(loginDTO.password,user.password);
        if(!isCorretPassword) throw createHttpError(401,"Senha incorreta");
        const payload:AccessTokenPayload = {
            sub:user.id,
            email:user.email,
            role:user.role,
            tenant:{
                id:user.tenant.id,
                name:user.tenant.name
            },
        };
        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken();
        const csrfToken = this.tokenService.generateCsrfToken();
        user.refreshToken = await bcrypt.hash(refreshToken, hashConfig.salt);
        user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.userRepository.save(user);
        return {
            acessToken:accessToken,
            refreshToken:refreshToken,
            csrfToken:csrfToken
        };
    }
}