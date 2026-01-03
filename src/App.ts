import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsConfig } from "./configs/Cors_Config";
import { sanitizeConfig } from "./configs/Sanitize_Config";

dotenv.config();

const app = express();
app.use(helmet());
app.set("trust proxy", true);
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.json({ limit: sanitizeConfig.body_limit }));

export default app;