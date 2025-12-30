import "reflect-metadata";
import app from "./App";
import { dataSource } from "./source/Data_Source";
import {serverConfig} from "./config/Server_Config"

try{
    dataSource.initialize();
    console.log(`Banco de dados Kaffyo conectado!`)
    app.listen(serverConfig.serverPort,()=>{
            console.log(`Api Kaffyo rodando na porta ${serverConfig.serverPort}!`)
        }
    );
}catch(error){
    console.log(error)
}