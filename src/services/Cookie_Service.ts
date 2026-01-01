import { RequestHandler } from "express";
import { cookieHttpOnlyConfig } from "../configs/Cookie_Config";

export class CookieService{

    setHttpOnlyCookie(content:string,cookieName:string) : RequestHandler {
        
        this.clearCookies(cookieName);

        return (req, res, next) => {
            res.cookie(
                cookieName, 
                content, 
                {
                    httpOnly: cookieHttpOnlyConfig.httpOnly,
                    secure: cookieHttpOnlyConfig.secure,
                    sameSite: cookieHttpOnlyConfig.sameSite,
                    maxAge: cookieHttpOnlyConfig.maxAge
                }
            );
            next();
        };

    };

    setNoHttpOnlyCookie(content:string,cookieName:string) : RequestHandler{

        this.clearCookies(cookieName);

        return (req, res, next) => {
            res.cookie(
                cookieName, 
                content, 
                {
                    httpOnly: cookieHttpOnlyConfig.httpOnly,
                    secure: cookieHttpOnlyConfig.secure,
                    sameSite: cookieHttpOnlyConfig.sameSite,
                    maxAge: cookieHttpOnlyConfig.maxAge
                }
            );
            next();
        };
        
    }

    getCookie(cookieName:string) : RequestHandler{

        return (req,res,next) => {
            req.cookieValue =  req.cookies?.[cookieName];
            next();
        };

    };

    clearCookies(cookieName:string) : RequestHandler{
        
        return (req,res,next) => {
            res.clearCookie(
                cookieName,
                {
                    httpOnly: cookieHttpOnlyConfig.httpOnly,
                    secure: cookieHttpOnlyConfig.secure,
                    sameSite: cookieHttpOnlyConfig.sameSite,
                    maxAge: cookieHttpOnlyConfig.maxAge
                }
            );
            next();
        };

    };

}