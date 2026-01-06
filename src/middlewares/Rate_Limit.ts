import {  RequestHandler } from "express";
import { RateLimitOptions } from "../interfaces/Rate_Limit_Options";
import pino from "pino";
import { redisSource } from "../sources/Redis_Source";
import createHttpError from "http-errors";
const logger = pino();
const redis = redisSource;

export function rateLimitWithSessionId(options:RateLimitOptions) : RequestHandler{
    const { windowSec, maxRequests } = options;
    return async(req,res,next)=>{
        try {
            if (!req.user?.session?.refreshTokenId) {
                return next();
            }
            const ip = req.ip?.replace("::ffff:","");
            const route = req.path;
            const sessionId = req.user.session.refreshTokenId;
            const key = `RateLimit:${ip}:${sessionId}:${route}`;
            const current = await redis.incr(key);
            if(current === 1){
                await redis.expire(key, windowSec);
            };
            if(current>maxRequests){
                const ttl = await redis.ttl(key);
                return next(
                    createHttpError(429, `Limite excedido. Tente novamente em ${ttl}s`)
                );
            };
            next();
        }
        catch(error){
            logger.error("RateLimit redis falhou !");
            next(error);
        };
    };
};
export function rateLimitNoAuth(options:RateLimitOptions) : RequestHandler{
    const { windowSec, maxRequests } = options;
    return async(req,res,next)=>{
        try {
            const ip = req.ip?.replace("::ffff:","");
            const route = req.path;
            const userAgent =  req.get("user-agent")
            const key = `RateLimit:${ip}:${userAgent}:${route}`;
            const current = await redis.incr(key);
            if(current === 1){
                await redis.expire(key, windowSec);
            };
            if(current>maxRequests){
                const ttl = await redis.ttl(key);
                return next(
                    createHttpError(429, `Limite excedido. Tente novamente em ${ttl}s`)
                );
            };
            next();
        }
        catch(error){
            logger.error("RateLimit redis falhou !");
            next(error);
        };
    };
};