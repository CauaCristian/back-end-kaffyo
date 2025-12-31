import createHttpError from "http-errors";

export const serverConfig = (()=>{
    const serverPort = process.env.PORT;
    if(!serverPort) throw createHttpError("Configuração de server invalida");
    return {
        serverPort
    }
})();