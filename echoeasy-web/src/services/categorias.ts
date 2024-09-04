import { api } from "./api";

export const getAllCategories = async () => {
  const response = await api.get(`/categorias`);
  return response.data;
};
