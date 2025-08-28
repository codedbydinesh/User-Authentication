import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageOnCloudinary = async (filePath) => {
    try {

        if(!filePath){
            return null
        }

        const upload = await cloudinary.uploader.upload(filePath)

        fs.unlinkSync(filePath)
        console.log(upload);
        return upload.secure_url
        
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error);
    }
}


export default uploadImageOnCloudinary