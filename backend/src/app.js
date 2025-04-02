import express from 'express'
import dotenv from 'dotenv'
import userRoutes from '../src/routes/user.routes.js'

const app =express();
dotenv.config();
app.use('/api/user',userRoutes)

export default app
