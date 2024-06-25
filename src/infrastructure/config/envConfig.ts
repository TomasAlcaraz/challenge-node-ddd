import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT || 5000;
