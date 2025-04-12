import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import userRoutes from '../src/routes/user.routes.js'
import chatRoutes from'../src/routes/chat.routes.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import cors from 'cors'
const app =express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use(errorHandler);
app.use(notFound)

export default app
