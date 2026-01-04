import { RequestHandler } from "express";
import { UserService } from "../services/User_Service";

export class UserController{
    private userService = new UserService();

    findAll:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.findAll(req.query.page as string,req.query.limit as string,req.user)
            res.status(200).send(response);
        } catch(error){
            next(error);
        }
    }
    findAllByTenant:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.findAllByTenant(req.query.page as string,req.query.limit as string,req.params.tenantId,req.user);
            res.status(200).send(response);
        } catch(error){
            next(error);
        }
    }
    createUser:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.createUser(req.body,req.ip,req.get("user-agent"));
            res.status(201).send(response);
        } catch(error){
            next(error);
        }
    }
    updateUser:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.updateUser(req.body,req.user,req.ip,req.get("user-agent"));
            res.status(201).send(response);
        } catch(error){
            next(error);
        }
    }
    updateByTenant:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.updateByTenant(req.body,req.params.tenantId,req.user,req.ip,req.get("user-agent"));
            res.status(201).send(response);
        } catch(error){
            next(error);
        }
    }
    deleteByTenant:RequestHandler = async (req,res,next)=>{
        try{
            const response = await this.userService.deleteByTenant(req.user,req.params.userId,req.params.tenantId,req.ip,req.get("user-agent"));
            res.status(201).send(response);
        } catch(error){
            next(error);
        }
    }
}