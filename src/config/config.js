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

export const config = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
}