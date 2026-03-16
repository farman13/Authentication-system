import mongoose from "mongoose";
import { config } from "../config/config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};