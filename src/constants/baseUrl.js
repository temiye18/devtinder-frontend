const isProduction = import.meta.env.MODE === "production";
export const BASE_URL = isProduction ? "/api" : "http://localhost:3000";
