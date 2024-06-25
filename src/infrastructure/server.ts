import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./dbConfig";
import authRoutes from "../presentation/routes/authRoutes";
import projectRoutes from "../presentation/routes/projectRoutes";
import taskRoutes from "../presentation/routes/taskRoutes";
import userRoutes from "../presentation/routes/userRoutes";
import commentRoutes from "../presentation/routes/commentRoutes";
import { specs, swaggerUi } from "./swagger";
import { PORT } from "./config/envConfig";

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Connect to database
connectDB();

// Swagger setup: documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => res.send("API is running"));

// Server setup
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;