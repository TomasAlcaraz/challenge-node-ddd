import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT || 5000;
export const DB_NAME = process.env.DB_NAME
export const DB_PASSWORD = process.env.DB_PASSWORD