import { IsNull, Repository } from "typeorm";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";

export class RefreshTokenRepository extends Repository<RefreshTokenEntity>{

    async findByRefreshToken(refreshToken:string):Promise<RefreshTokenEntity|null>{
        return await this.findOne({
            where:{
                refreshToken:refreshToken,
            },
            relations: ["user"]
        });
    }

    async findByUserIdAndUserAgent(userId:string,userAgent:string){
        return await this.findOne({
            where:{
                user:{
                    id:userId,
                },
                userAgent:userAgent
            },
            relations: ["user"]
        });
    }

    async findAllActiveByUserId(userId:string){
        return await this.findOne({
            where:{
                user:{
                    id:userId
                },
                revokedAt:IsNull()
            }
        })
    }
    
}