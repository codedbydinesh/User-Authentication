import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';
dotenv.config({
    path:"./.env"
})

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/users", authRouter)


export {app}