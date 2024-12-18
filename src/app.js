import express from 'express';
import errorController from './controllers/errorController.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limi: '10kb' }));
app.use(cookieParser())

// Router imports
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';
import studentRouter from './routes/studentRoutes.js';
import classRouter from './routes/classRoutes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/class', classRouter);

app.use(errorController)

export { app };