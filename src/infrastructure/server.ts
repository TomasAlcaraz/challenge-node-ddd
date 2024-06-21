import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./dbConfig";
import authRoutes from "../presentation/routes/authRoutes";
import projectRoutes from "../presentation/routes/projectRoutes";
import taskRoutes from "../presentation/routes/taskRoutes";
import userRoutes from "../presentation/routes/userRoutes";
import { specs, swaggerUi } from "./swagger";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Connect to database
connectDB();

// Swagger setup : documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API is running"));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
