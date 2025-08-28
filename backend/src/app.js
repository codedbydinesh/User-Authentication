import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
dotenv.config({
    path:"./.env"
})

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))

app.use("/api/v1/users", authRouter)


export {app}