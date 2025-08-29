import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({message:"Unauthorized request"})    
        }
        
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decodedToken.id

        next();


    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}