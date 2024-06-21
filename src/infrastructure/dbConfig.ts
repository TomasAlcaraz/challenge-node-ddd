import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// config mongo db connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
