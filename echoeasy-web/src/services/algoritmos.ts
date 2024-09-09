import { api } from "./api";

export const getAllAlgoritmos = async () => {
  const response = await api.get(`/algoritmos`);
  return response.data;
};
