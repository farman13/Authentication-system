import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import ApiResponse from "../utils/ApiResponse.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json(new ApiResponse(401, { message: "Unauthorized" }));
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
}