import express from "express";
import { createUserController, getAllUsersController } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsersController);

router.post("/", createUserController);

export default router;
