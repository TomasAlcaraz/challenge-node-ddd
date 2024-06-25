import User from "../../../domain/models/User";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

export enum orderEnum {
  DESC = "DESC",
  ASC = "ASC",
}

export interface getUserParameters {
  name?: string;
  email?: string;
  sortBy?: orderEnum;
  sortOrder?: statusEnum;
  page?: string;
  pageSize?: string;
}

export const getAllUsers = async (data: getUserParameters) => {
  // Parámetros de paginación opcionales
  const page = parseInt(data.page as string) || 1;
  const pageSize = parseInt(data.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;

  // Parámetros de ordenación opcionales
  const sortBy = data.sortBy as string;
  const sortOrder = data.sortOrder;

  // Consulta para obtener usuarios con paginación
  const query: any = {
    limit: pageSize,
    offset: offset,
    order: sortBy ? [[sortBy, sortOrder]] : [],
  };

  // Agrega condiciones de filtrado si se proporcionan
  if (data.name) {
    query.where = { name: data.name };
  }
  if (data.email) {
    query.where = { ...query.where, email: data.email };
  }
  const users = await User.find(query);

  const total = await User.countDocuments();
  return { users, total };
};
