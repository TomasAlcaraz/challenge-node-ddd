import { Request, Response } from "express";
import { searchProjects } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const searchProjectsController = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { searchTerm, page, limit } = req.query;
      const projects = await searchProjects(userId, searchTerm as string);
      sendSuccessResponse(res, projects);
    } catch (error: any) {
      sendErrorResponse(res, error.message);
    }
  }

export { searchProjectsController };

/**
 * @swagger
 * /projects/search/{userId}:
 *   get:
 *     summary: Search projects by user ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose projects are being searched
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter projects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
 */
