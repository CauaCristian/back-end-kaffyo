export const cookieHttpOnlyConfig = (()=>{
    const httpOnly = true;
    const secure = process.env.API_MODE === "production";
    const sameSite:"none"| "lax" =  process.env.API_MODE === "production" ? "none" : "lax";
    const maxAge = 86400 * 7;
    return {
        httpOnly,secure,sameSite,maxAge
    }
})();

export const cookieNoHttpOnlyConfig = (()=>{
    const httpOnly = false;
    const secure = process.env.API_MODE === "production";
    const sameSite:"none"| "lax" =  process.env.API_MODE === "production" ? "none" : "lax";
    const maxAge = 86400 * 7;
    return {
        httpOnly,secure,sameSite,maxAge
    }
})();