import createHttpError from "http-errors";


export const redisConfig = (()=>{

    const redisHost =  process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    const redisPassword = process.env.REDIS_PASSWORD;

    if(!redisHost || !redisPort || !redisPassword) throw createHttpError(500,"Configuração de cache inválida");

    return {
        host: redisHost,
        port: Number(redisPort),
        password: redisPassword,
        maxRetriesPerRequest: 5,
        enableReadyCheck: true,
    }

})();