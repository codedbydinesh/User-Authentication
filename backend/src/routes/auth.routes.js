import { Router } from 'express'
import { getUserData, login, logout, signUp } from '../controllers/auth.controllers.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'

const authRouter = Router()

authRouter.post("/signup",upload.single('profileImage'), signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/getuserdata",verifyToken,getUserData)

export default authRouter