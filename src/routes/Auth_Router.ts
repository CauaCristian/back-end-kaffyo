import { Router } from "express";
import { AuthController } from "../controllers/Auth_Controller";
import { sanitizeHTML } from "../middlewares/Sanitize_Html";
import { checkAuth } from "../middlewares/Check_Auth";
import { checkCsrf } from "../middlewares/Check_Csrf";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login",authController.login);
authRouter.post("/register",authController.register);
authRouter.post("/refresh",checkCsrf,authController.refresh);
authRouter.post("/logout",checkAuth,checkCsrf,authController.logout);

export default authRouter;