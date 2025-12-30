import { RequestHandler,Request ,Response, NextFunction} from "express"
export const checkAuth:RequestHandler = (req:Request,res:Response,next:NextFunction)=>{
    next();
}