export const corsConfig = (()=>{
    return {
        origin:process.env.ALLOWED_ORIGINS?.split(",").map((a)=>a.trim()),
        methods: process.env.ALLOWED_METHODS?.split(",").map((a)=>a.trim()),
        allowedHeaders: process.env.ALLOWED_HEADERS?.split(",").map((a)=>a.trim()),
        exposedHeaders:process.env.EXPOSED_HEADERS?.split(",").map((a)=>a.trim()),
        credentials: true,
        maxAge: 86400,
    }
})();