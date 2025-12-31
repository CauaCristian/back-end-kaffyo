export const cookieConfig = (()=>{
    const httpOnly = true;
    const secure = process.env.API_MODE === "production";
    const sameSite:"none" = "none";
    const maxAge = 1000 * 60 * 60;
    return {
        httpOnly,secure,sameSite,maxAge
    }
})();