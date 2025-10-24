import mongoose from "mongoose";
import config from "../config/config.js";
async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_STR);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;
