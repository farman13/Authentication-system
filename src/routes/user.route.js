import { Router } from "express";
import { register, login, getMe, logout, logoutAll, rotateToken, verifyEmail } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', authMiddleware, getMe);
userRouter.post('/token/refresh', rotateToken);
userRouter.post('/logout', authMiddleware, logout);
userRouter.post('/logout-all', authMiddleware, logoutAll);
userRouter.post('/verify-email', verifyEmail);

export default userRouter;