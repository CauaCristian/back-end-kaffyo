import { RequestHandler } from "express";
import { cookieHttpOnlyConfig } from "../configs/Cookie_Config";

export class CookieService{

    setHttpOnlyCookie(cookieName:string,content:string) : RequestHandler {
        
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

    getCookie(){
        
    }

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