import { RequestHandler } from "express";
import { cookieConfig } from "../configs/Cookie_Config";

export class CookieService{

    setCookie(content:string,cookieName:string) : RequestHandler {
        
        this.clearCookies(cookieName);

        return (req, res, next) => {
            res.cookie(
                cookieName, 
                content, 
                {
                    httpOnly: cookieConfig.httpOnly,
                    secure: cookieConfig.secure,
                    sameSite: cookieConfig.sameSite,
                    maxAge: cookieConfig.maxAge
                }
            );
            next();
        };

    };

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
                    httpOnly: cookieConfig.httpOnly,
                    secure: cookieConfig.secure,
                    sameSite: cookieConfig.sameSite,
                    maxAge: cookieConfig.maxAge
                }
            );
            next();
        };

    };

}