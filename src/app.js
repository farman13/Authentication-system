import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);

export default app;