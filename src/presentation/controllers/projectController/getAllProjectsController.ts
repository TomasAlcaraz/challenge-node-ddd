import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Project from "../../../domain/models/Project";
import Joi from "joi";

export const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    // Validar el valor de status usando Joi
    const { error } = statusSchema.validate(status);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    // Construir el filtro de búsqueda
    const filter = status ? { status } : {};

    const projects = await Project.find(filter)
      .select("_id title status members")
      .populate({
        path: "members",
        select: "_id username email roles",
      })
      .populate({
        path: "tasks",
        select: "_id title dueDate status assignedTo",
      });

    const total = await Project.countDocuments(filter);

    sendSuccessResponse(res, { total, projects });
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

const statusSchema = Joi.string()
  .valid(...Object.values(statusEnum))
  .optional();


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Obtener todos los proyectos
 *     description: Obtiene todos los proyectos, opcionalmente filtrados por estado.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - not started
 *             - in progress
 *             - completed
 *         description: Filtrar proyectos por estado (opcional)
 *     responses:
 *       '200':
 *         description: Lista de proyectos recuperados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   description: Número total de proyectos
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */