import express from "express";
import {
  createProjectController,
  getProjectByUserController,
  searchProjectsController,
  getAllProjectsController
} from "../controllers/projectController";

const router = express.Router();

router.get("/", getAllProjectsController);
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Project'
 */

router.get("/:userId", getProjectByUserController);
/**
 * @swagger
 * /api/projects/{userId}:
 *  get:
 *    summary: Get projects by user
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *        description: Filter projects by status (not started, in progress, completed)
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: Page number for pagination
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *        description: Number of projects per page
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projects:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Project'
 *                total:
 *                  type: integer
 *                  description: Total number of projects
 *                page:
 *                  type: integer
 *                  description: Current page number
 *                limit:
 *                  type: integer
 *                  description: Projects per page limit
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

router.get("/search/:userId", searchProjectsController);
/**
 * @swagger
 * /api/projects/search/{userId}:
 *  get:
 *    summary: Search projects by user ID and search term
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user whose projects are being searched
 *      - in: query
 *        name: searchTerm
 *        schema:
 *          type: string
 *        description: The term to search for in project titles and descriptions
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 1
 *        description: The page number for pagination
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *          default: 10
 *        description: The maximum number of projects per page
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projects:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Project'
 *                total:
 *                  type: integer
 *                  description: Total number of projects matching the search criteria
 *                page:
 *                  type: integer
 *                  description: Current page number
 *                limit:
 *                  type: integer
 *                  description: Maximum number of projects per page
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

router.post("/", createProjectController);
/**
 * @swagger
 * /api/projects:
 *  post:
 *    summary: Create a new project
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Project'
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */


export default router;
