import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    let token = jwt.sign(
        {id},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:process.env.JWT_EXPIRY_KEY
        }
    )
    return token
}

export {generateToken}