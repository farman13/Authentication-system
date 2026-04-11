import { Router } from "express";
import { register, login, getMe, logout, logoutAll, rotateToken, verifyEmail } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', authMiddleware, getMe);
userRouter.get('/refresh-token', rotateToken);
userRouter.get('/logout', logout);
userRouter.get('/logoutAll', logoutAll);
userRouter.get('/verify-email', verifyEmail);

export default userRouter;