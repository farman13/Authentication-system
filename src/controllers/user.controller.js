import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";

const generateAccessandRefreshToken = async (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "7d" });

    return { accessToken, refreshToken };
}

export const register = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json(new ApiResponse(400, { message: "All fields are required" }));
    }

    const isALreadyExistingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (isALreadyExistingUser) {
        return res.status(201).json(new ApiResponse(201, { message: "User with this email or username already exist" }))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(newUser._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json(new ApiResponse(201, { accessToken }, "User registered successfully"));
});

export const getMe = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json(new ApiResponse(404, { message: "User not found" }));
    }
    res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
});

export const refreshToken = AsyncHandler(async (req, res) => {
    const existingRefreshToken = req.cookies.refreshToken;
    if (!existingRefreshToken) {
        return res.status(401).json(new ApiResponse(401, { message: "Unauthorized" }));
    }
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(existingRefreshToken.id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json(new ApiResponse(200, { accessToken }, "AccessToken and RefreshToken generated successfully"));
})