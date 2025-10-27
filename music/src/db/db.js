import mongoose from "mongoose";
import { config } from "dotenv";

async function connectDB() {

    try{
await mongoose.connect(config.MONGO_URI)
 console.log("Database connected successfully");

}
    catch(err){
        console.error("Database connection error:", err);
    }
}

export default connectDB;