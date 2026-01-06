import { createClient } from "redis";
import { redisConfig } from "../configs/Redis_Config";

export const redisSource = createClient({
    username:redisConfig.username,
    password: redisConfig.password,
    socket:{
        port:redisConfig.port,
        host:redisConfig.host
    }
});