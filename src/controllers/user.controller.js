import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { Session } from "../models/session.model.js";
import bcrypt from 'bcrypt';

const generateAccessToken = (userId, sessionId) => {
    const accessToken = jwt.sign({ id: userId, sessionId: sessionId }, config.jwtSecret, { expiresIn: "15m" });

    return accessToken;
}

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "7d" });

    return refreshToken;
}

const getDecodedToken = async (token) => {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    return decodedToken;

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


    const newUser = new User({ username, email, password });
    await newUser.save();

    const newSession = new Session({
        userId: newUser._id,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const refreshToken = generateRefreshToken(newUser._id, newSession._id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    newSession.refreshTokenHash = refreshTokenHash;
    await newSession.save();

    const accessToken = generateAccessToken(newUser._id, newSession._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json(new ApiResponse(201, { accessToken }, "User registered successfully"));
});

export const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json(new ApiResponse(403, "Username or password required"));
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.json(new ApiResponse(401, "User not exist"));
    }

    if (!await user.isPasswordCorrect(password)) {
        return res.json(new ApiResponse(403, "Incorrect Password"));
    }

    const newSession = new Session({
        userId: user._id,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const refreshToken = generateRefreshToken(newUser._id, newSession._id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    newSession.refreshTokenHash = refreshTokenHash;
    await newSession.save();

    const accessToken = generateAccessToken(newUser._id, newSession._id);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.json(new ApiResponse(200, { accessToken }, "User logged In Successfully"))

})

export const getMe = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json(new ApiResponse(404, { message: "User not found" }));
    }
    res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
});

export const rotateToken = AsyncHandler(async (req, res) => {
    const existingRefreshToken = req.cookies.refreshToken;

    if (!existingRefreshToken) {
        return res.status(401).json(new ApiResponse(401, { message: "Refresh Token not found" }));
    }

    const decodedToken = getDecodedToken(refreshToken);
    const userSession = await Session.findOne({ sessionId: decodedToken.sessionId, revoked: false });

    if (!userSession) {
        return res.json(new ApiResponse(403, "Session not found"))
    }

    const refreshToken = generateRefreshToken(newUser._id, userSession._id);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    userSession.refreshTokenHash = refreshTokenHash;
    await userSession.save();

    const accessToken = generateAccessToken(newUser._id, userSession._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json(new ApiResponse(200, { accessToken }, "AccessToken and RefreshToken generated successfully"));
})

export const logout = AsyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.json(new ApiResponse(403, "RefreshToken not found"))
    }

    const decodedToken = getDecodedToken(refreshToken);

    const userSession = await Session.findOne({ $or: [{ sessionId: decodedToken.sessionId }, { revoked: false }] })

    if (!userSession) {
        return res.json(new ApiResponse(403, "Session not found"))
    }

    userSession.revoked = true;
    await userSession.save();

    res.clearCookie("refreshToken");

    res.json(new ApiResponse(200, "User logged out seccussfully"));

})

export const logoutAll = AsyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.json(new ApiResponse(403, "RefreshToken not found"))
    }

    const decodedToken = getDecodedToken(refreshToken);

    await Session.updateMany({
        userId: decodedToken.userId,
        revoked: false
    }, {
        revoked: true
    })

    res.clearCookie("refreshToken");

    res.json(new ApiResponse(200, "Logged out from all devices successfully"))

})