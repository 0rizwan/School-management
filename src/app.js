import express from 'express';
import adminRouter from './routes/adminRoutes.js'
import errorController from './controllers/errorController.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true, limi: '10kb'}))

app.use('/api/v1/admin', adminRouter);

app.use(errorController)

export { app };