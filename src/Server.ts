import "reflect-metadata";
import app from "./App";
import { dataSource } from "./sources/Data_Source";
import {serverConfig} from "./configs/Server_Config"
import cookieParser from "cookie-parser";
import cors from "cors"
import { corsConfig } from "./configs/Cors_Config";
import express, { Router } from "express";
import { sanitizeConfig } from "./configs/Sanitize_Config";
import helmet from "helmet";

async function initialize() {

    try {

        await dataSource.initialize();
        console.log("Banco de dados conectado!");

        app.use(helmet());
        app.use(cookieParser());
        app.use(cors(corsConfig));
        app.use(express.json({ limit: sanitizeConfig.body_limit }));
        
        app.listen(serverConfig.serverPort, () => {
            console.log(`API rodando na porta ${serverConfig.serverPort}!`);
        });

    } catch (error) {

        console.error("Erro ao iniciar API:", error);

    }

}

initialize();