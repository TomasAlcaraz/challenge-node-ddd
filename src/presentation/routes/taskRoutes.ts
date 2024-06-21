import express from "express";
import {
  getTasksByUserController,
  searchTasksController,
} from "../controllers/taskController";

const router = express.Router();

router.get("/:userId", getTasksByUserController);

router.get("/search/:userId", searchTasksController);

export default router;
