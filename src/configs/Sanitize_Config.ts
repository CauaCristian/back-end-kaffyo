import createHttpError from "http-errors";

export const sanitizeConfig = (()=>{

    const max_depth = process.env.MAX_DEPTH;
    const max_array_length = process.env.MAX_ARRAY_LENGTH;
    const max_nodes = process.env.MAX_NODES;
    const body_limit = process.env.BODY_LIMIT;

    if(!max_depth || !max_array_length || !max_nodes || !body_limit) {
        throw createHttpError(500,"Configuração de sanitização invalida")
    };

    return {
        max_depth:Number.parseInt(max_depth),
        max_array_length:Number.parseInt(max_array_length),
        max_nodes:Number.parseInt(max_nodes),
        body_limit:body_limit
    }
    
})();