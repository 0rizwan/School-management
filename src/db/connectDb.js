import mongoose from "mongoose";
import { DBName } from "../constants.js";

export default async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DBName}`)
        console.log('MongoDB connected', 'DB Host', connectionInstance.connection.host)
    } catch (error) {
     console.log("MongoDB connection error ", error)   
    }
}

