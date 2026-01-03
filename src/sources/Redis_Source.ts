import Redis from "ioredis";
import { redisConfig } from "../configs/Redis_Config";

export const redisSource = new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    maxRetriesPerRequest: 5,
    enableReadyCheck: true,
});