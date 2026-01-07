import { Router } from "express";
import { AuthController } from "../controllers/Auth_Controller";
import { checkAuth } from "../middlewares/Check_Auth";
import { checkCsrf } from "../middlewares/Check_Csrf";
import { rateLimitNoAuth, rateLimitWithSessionId } from "../middlewares/Rate_Limit";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login",rateLimitNoAuth({windowSec:60,maxRequests:5}),authController.login);
authRouter.post("/registerUserSolo",rateLimitNoAuth({windowSec:60,maxRequests:5}),authController.registerUserSolo);
authRouter.post("/refresh",checkCsrf,rateLimitNoAuth({windowSec:60,maxRequests:5}),authController.refresh);
authRouter.post("/logout",checkAuth,checkCsrf,rateLimitWithSessionId({windowSec:60,maxRequests:5}),authController.logout);

export default authRouter;