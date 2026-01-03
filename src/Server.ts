import "reflect-metadata";
import app from "./App";
import { dataSource } from "./sources/Data_Source";
import {serverConfig} from "./configs/Server_Config"

async function initialize() {

    try {
        await dataSource.initialize();
        console.log("Banco de dados conectado!");
        app.listen(serverConfig.serverPort, () => {
            console.log(`API rodando na porta ${serverConfig.serverPort}!`);
        });
    } catch (error) {
        console.error("Erro ao iniciar API:", error);
    }

}

initialize();