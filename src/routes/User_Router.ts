import { Router } from "express";
import { UserController } from "../controllers/User_Controller";
import { checkAuth } from "../middlewares/Check_Auth";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/findAll",checkAuth,userController.findAll);