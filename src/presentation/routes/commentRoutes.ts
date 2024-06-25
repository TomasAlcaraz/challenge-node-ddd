import express from "express";
import {
  getCommentByIdController,
  deleteCommentController,
  updateCommentById
} from "../controllers/commentController";

const router = express.Router();

router.get("/:id", getCommentByIdController);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     description: Retrieve a comment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the comment to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */

router.put("/:id", updateCommentById);
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     description: Updates a comment with the specified ID using the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCommentInput'
 *     responses:
 *       '200':
 *         description: Updated comment successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */

router.delete("/:id", deleteCommentController);
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     description: Delete a comment by its ID. Optionally, the ID of the task or project to which the comment is associated can be provided via query parameters.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the comment to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *       - in: query
 *         name: taskId
 *         description: ID of the task associated with the comment
 *         schema:
 *           type: string
 *           format: ObjectId
 *       - in: query
 *         name: projectId
 *         description: ID of the project associated with the comment
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '204':
 *         description: Comment successfully deleted
 *       '400':
 *         description: Error message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */