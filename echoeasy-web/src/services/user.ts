import { api } from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};
