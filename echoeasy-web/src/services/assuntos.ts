import { api } from "./api";

export const getAllAssuntosByDocumentId = async (documentId: string) => {
  const response = await api.get(`/assuntos/all?document_id=${documentId}`);
  return response.data;
};

export const getAssuntoById = async (assuntoId: string) => {
  const response = await api.get(`/assuntos/search?_id=${assuntoId}`);
  return response.data;
};
