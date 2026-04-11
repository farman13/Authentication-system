import dotenv from "dotenv";
import ApiError from "../utils/ApiError.js";

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new ApiError(404, "MONGO_URI is not defined in the environment variables");
}

if (!process.env.PORT) {
    throw new ApiError(404, "PORT is not defined in the environment variables");
}

if (!process.env.JWT_SECRET) {
    throw new ApiError(404, "JWT_SECRET is not defined in the environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new ApiError(404, "GOOGLE_CLIENT_ID is not defined in the environment variables");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new ApiError(404, "GOOGLE_CLIENT_SECRET is not defined in the environment variables");
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new ApiError(404, "GOOGLE_REFRESH_TOKEN is not defined in the environment variables");
}

if (!process.env.GOOGLE_USER) {
    throw new ApiError(404, "GOOGLE_USER is not defined in the environment variables");
}


export const config = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleUser: process.env.GOOGLE_USER
}