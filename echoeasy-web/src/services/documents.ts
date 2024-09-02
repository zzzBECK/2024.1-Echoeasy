import { api } from "./api";

export const getAllDocuments = async () => {
  const response = await api.get("/documentos/all");
  return response.data;
};

export const getDocumentById = async (documentId: string) => {
  const response = await api.get(`/documentos/search?_id=${documentId}`);
  return response.data;
};
