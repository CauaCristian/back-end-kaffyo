import createHttpError from "http-errors";

export const dbConfig = (()=>{

    const dbType = process.env.DB_TYPE;
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbDatabase = process.env.DB_DATABASE;
    const dbEntities = process.env.DB_ENTITIES?.split(",").map(a => a.trim());
    const dbSynchronize = process.env.DB_SYNCHRONIZE;

    if(!dbHost || !dbPort || !dbUsername || !dbPassword || !dbDatabase) throw createHttpError(500,"Configuração de database inválida");

    return {
        dbType,
        dbHost,
        dbPort,
        dbUsername,
        dbPassword,
        dbDatabase,
        dbEntities,
        dbSynchronize
    };

})();