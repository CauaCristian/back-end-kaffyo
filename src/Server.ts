import "reflect-metadata";
import app from "./App";
import { dataSource } from "./sources/Data_Source";
import {serverConfig} from "./configs/Server_Config";
import dotenv from "dotenv";
import {redisSource } from "./sources/Redis_Source";
async function initialize() {
    
    try {
        dotenv.config();
        await dataSource.initialize();
        redisSource.on("connect", () => {
            console.log("✅ Redis conectado");
        }).on("error", (err) => {
            console.error("❌ Redis erro:", err.message);
        }).connect();
        console.log("✅ Banco de dados conectado!");
        app.listen(serverConfig.serverPort, () => {
            console.log(`✅ API rodando na porta ${serverConfig.serverPort}!`);
        });
    } catch (error) {
        console.error("❌ Erro ao iniciar API:", error);
    }

}

initialize();