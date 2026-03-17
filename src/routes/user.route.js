import { Router } from "express";
import { register, login, getMe, refreshToken } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getMe', authMiddleware, getMe);
userRouter.get('/refresh-token', refreshToken);

export default userRouter;