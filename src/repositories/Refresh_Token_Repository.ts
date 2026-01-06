import { IsNull, Repository } from "typeorm";
import { RefreshTokenEntity } from "../entities/system/Refresh_Token_Entity";
import { dataSource } from "../sources/Data_Source";

export const refreshTokenRepository = dataSource.getRepository(RefreshTokenEntity).extend({
    async findByRefreshToken(refreshToken:string):Promise<RefreshTokenEntity|null>{
        return await this.findOne({
            where:{
                refreshToken:refreshToken,
            },
            relations: ["user"]
        });
    },

    async findByUserIdAndUserAgent(userId:string,userAgent:string|undefined){
        return await this.findOne({
            where:{
                user:{
                    id:userId,
                },
                userAgent:userAgent
            },
            relations: ["user"]
        });
    },

    async findAllActiveByUserId(userId:string){
        return await this.find({
            where:{
                user:{
                    id:userId
                },
                revokedAt:IsNull()
            }
        })
    },
    async revokeAllByUser(userId:string){
        const sessions = await this.findAllActiveByUserId(userId);
        for(var i = 0;i < sessions.length; i++){
            sessions[i].revokedAt = new Date();
        }
    },
});