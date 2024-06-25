import User from "../../../domain/models/User";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

export enum orderEnum {
  DESC = "DESC",
  ASC = "ASC",
}

interface getUserParameters {
  name?: string;
  email?: string;
  sortBy?: orderEnum;
  sortOrder?: statusEnum;
  page?: string;
  pageSize?: string;
}

export const getAllUsers = async (data: getUserParameters) => {
  // Optional pagination parameters
  const page = parseInt(data.page as string) || 1;
  const pageSize = parseInt(data.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;

  // Optional sorting parameters
  const sortBy = data.sortBy as string;
  const sortOrder = data.sortOrder;

  // Query to get users with pagination
  const query: any = {
    limit: pageSize,
    offset: offset,
    order: sortBy ? [[sortBy, sortOrder]] : [],
  };

  // Add filtering conditions if provided
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
