export const cookieHttpOnlyConfig = (()=>{
    const httpOnly = true;
    const secure = process.env.API_MODE === "production";
    const sameSite:"none"| "lax" =  process.env.API_MODE === "production" ? "none" : "lax";
    const maxAge = 86400 * 7;
    return {
        httpOnly,secure,sameSite,maxAge
    }
})();