import express from "express";
import {
  getAllTasksController,
  getTasksByUserController,
  searchTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasksController);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Retrieve a list of all tasks.
 *     tags: 
 *       - Tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */

router.get("/user/:userId", getTasksByUserController);
/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Retrieve tasks by user
 *     description: Retrieve a list of tasks assigned to a user, optionally filtered by status.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *         required: false
 *         description: The status of the tasks to filter by
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get("/search/:id", searchTasksController);
/**
 * @swagger
 * /search/{id}:
 *   get:
 *     summary: Search tasks by user ID and search term
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Term to search for in task titles and descriptions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: List of tasks matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or tasks not found
 *       500:
 *         description: Internal server error
 */

router.post("/", createTaskController);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task and assigns it to a project. Optionally, the task can also be assigned to a user.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: Implement authentication
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: Implement user authentication using JWT
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date for the task
 *                 example: 2024-07-01
 *               projectId:
 *                 type: string
 *                 description: ID of the project to which the task belongs
 *                 example: 60d9f1f4f9d8b23c08f13c7e
 *               assignedTo:
 *                 type: string
 *                 description: ID of the user to whom the task is assigned (optional)
 *                 example: 60d9f1f4f9d8b23c08f13c7f
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 enum: [not started, in progress, completed]
 *                 example: in progress
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created task
 *                 title:
 *                   type: string
 *                   description: Title of the task
 *                 description:
 *                   type: string
 *                   description: Description of the task
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: Due date for the task
 *                 status:
 *                   type: string
 *                   description: Status of the task
 *                 projectId:
 *                   type: string
 *                   description: ID of the project to which the task belongs
 *                 assignedTo:
 *                   type: string
 *                   description: ID of the user to whom the task is assigned
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Project or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

router.delete("/:id", deleteTaskController);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Task not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.patch("/:id", updateTaskController);
/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update an existing task
 *     description: Update a task's details by its ID. Fields like `_id` cannot be updated.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task
 *               status:
 *                 type: string
 *                 enum: [not started, in progress, completed]
 *                 description: Status of the task
 *               projectId:
 *                 type: string
 *                 description: ID of the project the task belongs to
 *               assignedTo:
 *                 type: string
 *                 description: ID of the user the task is assigned to
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                   enum: [not started, in progress, completed]
 *                 projectId:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                 assignedTo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Validation error or update not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

export default router;
