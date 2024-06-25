import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/userController";
import { auth } from "../../infrastructure/middleware/auth";

const router = express.Router();

router.get("/", getAllUsersController);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with filtering and pagination.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */

router.post("/", createUserController);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     description: Creates a new user with the provided username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */

router.get("/:id", getUserByIdController);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID with optional filtering by project and task status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *       - in: query
 *         name: projectStatus
 *         description: Filter projects by status (not started, in progress, completed)
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *       - in: query
 *         name: taskStatus
 *         description: Filter tasks by status (not started, in progress, completed)
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

router.patch("/:id", updateUserByIdController);
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     description: Update user information by their ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: Updated user object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", deleteUserByIdController);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the deleted user
 *                 username:
 *                   type: string
 *                   description: Username of the deleted user
 *                 email:
 *                   type: string
 *                   description: Email of the deleted user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

export default router;
