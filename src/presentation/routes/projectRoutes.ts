import express from "express";
import {
  createProjectController,
  getProjectByIdController,
  searchProjectsController,
  getAllProjectsController,
  deleteProjectController,
  updateProjectController,
  getProjectByUserController,
  addProjectCommentController,
} from "../controllers/projectController";
import { validateStatus } from "../../infrastructure/middleware/validateStatus";

const router = express.Router();

router.get("/", validateStatus, getAllProjectsController);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of projects filtered by status
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *         description: The status of the projects to filter by
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of projects
 *                   example: 10
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ca"
 *                       title:
 *                         type: string
 *                         example: "Project Title"
 *                       status:
 *                         type: string
 *                         example: "in progress"
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60d0fe4f5311236168a109cb"
 *                             username:
 *                               type: string
 *                               example: "johndoe"
 *                             email:
 *                               type: string
 *                               example: "johndoe@examplee.com"
 *                             roles:
 *                               type: array
 *                               items:
 *                                 type: string
 *                                 example: "admin"
 *                       tasks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60d0fe4f5311236168a109cc"
 *                             title:
 *                               type: string
 *                               example: "Task Title"
 *                             dueDate:
 *                               type: string
 *                               format: date
 *                               example: "2023-12-31"
 *                             status:
 *                               type: string
 *                               example: "not started"
 *                             assignedTo:
 *                               type: string
 *                               example: "60d0fe4f5311236168a109cb"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: 'status' must be one of [not started, in progress, completed]"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */

router.get("/:id", validateStatus, getProjectByIdController);
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     description: Retrieve a project by its ID, including its members and tasks.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the project
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
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       roles:
 *                         type: array
 *                         items:
 *                           type: string
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                       status:
 *                         type: string
 *                         enum: [not started, in progress, completed]
 *                       assignedTo:
 *                         type: string
 *                         description: The user ID to whom the task is assigned
 *       400:
 *         description: Invalid project ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

router.get("/user/:id", validateStatus, getProjectByUserController);
/**
 * @swagger
 * /projects/user/{id}:
 *   get:
 *     summary: Get projects by user ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *         required: false
 *         description: Project status to filter by
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   status:
 *                     type: string
 *                   members:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         dueDate:
 *                           type: string
 *                           format: date
 *                         status:
 *                           type: string
 *                         assignedTo:
 *                           type: string
 */

router.delete("/:id", deleteProjectController);
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Deletes a project and all associated tasks.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid project ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Invalid project ID
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Project not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.patch("/:id", updateProjectController);
/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update a project
 *     tags: [Projects]
 *     description: Update an existing project with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Bad request, invalid input data
 *       '404':
 *         description: Project not found or no changes detected
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the project
 *         description:
 *           type: string
 *           description: The description of the project
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the project
 *         status:
 *           type: string
 *           enum:
 *             - NOT_STARTED
 *             - IN_PROGRESS
 *             - COMPLETED
 *           description: The status of the project
 *         members:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: List of member IDs associated with the project
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: List of task IDs associated with the project
 *
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the project
 *         title:
 *           type: string
 *           description: The title of the project
 *         description:
 *           type: string
 *           description: The description of the project
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the project
 *         status:
 *           type: string
 *           enum:
 *             - NOT_STARTED
 *             - IN_PROGRESS
 *             - COMPLETED
 *           description: The status of the project
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: List of members associated with the project
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *           description: List of tasks associated with the project
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: List of roles assigned to the user
 *
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         status:
 *           type: string
 *           enum:
 *             - not started
 *             - in progress
 *             - completed
 *           description: The status of the task
 *         assignedTo:
 *           $ref: '#/components/schemas/User'
 *           description: The user to whom the task is assigned
 */

router.post("/", createProjectController);
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided details.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the project
 *                 example: New Project
 *               description:
 *                 type: string
 *                 description: Description of the project
 *                 example: This is a new project.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date of the project
 *                 example: 2024-12-31
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs who are members of the project
 *                 example: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/:id/comments", addProjectCommentController);
/**
 * @swagger
 * /projects/{projectId}/comments:
 *   post:
 *     summary: Add a comment to a project
 *     tags: [Projects]
 *     description: Adds a new comment to the specified project.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project to add a comment to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *                 format: ObjectId
 *     responses:
 *       '201':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '400':
 *         description: Error in comment validation
 *       '404':
 *         description: Project not found
 */

router.get("/search/:id", searchProjectsController);

export default router;
