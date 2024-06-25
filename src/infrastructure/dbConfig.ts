import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGO_URI } from "./config/envConfig";

dotenv.config();

// config mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
