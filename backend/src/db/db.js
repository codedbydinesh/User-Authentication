import mongoose from 'mongoose'
import { MONGODB_NAME } from '../constants.js';



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${MONGODB_NAME}`)
        console.log(`MongoDb connected Successfully ! ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log('mongodb connection failed !! ', error);
        process.exit(1)
    }
}

export default connectDB