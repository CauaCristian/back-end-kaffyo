import { RequestHandler } from "express";
import { AuthService } from "../services/Auth_Service";
import { CookieService } from "../services/Cookie_Service";
import { UserService } from "../services/User_Service";

export class AuthController{

    private authService = new AuthService();
    private cookieService = new CookieService();
    private userService =  new UserService();

    login:RequestHandler = async (req,res,next) =>{
        try{
            const loginResponse = await this.authService.login(req.body,req.get("user-agent"),req.ip);
            this.cookieService.setHttpOnlyCookie("refresh-token",loginResponse.refreshToken);
            res.setHeader("X-Access-Token",loginResponse.accessToken);
            res.setHeader("X-CSRF-Token",loginResponse.csrfToken);
            res.sendStatus(200);
        } 
        catch (error) {
            next(error);
        }
    }

    register:RequestHandler = async (req,res,next) =>{
        try{
            const userResponse = this.userService.createUser(req.body,req.ip,req.get("user-agent"));
            res.status(201).send(userResponse);
        } 
        catch(error){
            next(error);
        }
    }

    refresh:RequestHandler = async (req,res,next) =>{
        try{
            const refreshResponse = await this.authService.refresh(req.get("user-agent"),req.ip,req.cookies("refresh-token"));
            this.cookieService.setHttpOnlyCookie("refresh-token",refreshResponse.refreshToken);
            res.setHeader("X-Access-Token",refreshResponse.accessToken);
            res.setHeader("X-CSRF-Token",refreshResponse.csrfToken);
            res.sendStatus(200);
        }
        catch(error){
            next(error);
        }
    }

    logout:RequestHandler = async (req,res,next)=>{
        try{
            this.authService.logout(req.accessToken,req.ip,req.get("user-agent"),req.user,req.cookies["refresh-token"]);
            res.sendStatus(200);
        }
        catch(error) {
            next(error);
        }
    }
}