import { ApiService } from "../api/apiService";

export class DocService extends ApiService {
    async getAllDocuments(title: string, categories: string[]) {
        return this.get(`/documentos/all?title=${title}&categorias=${categories}`);
    }
    async readDocument(documentId: string) {
        return this.get(`/documentos/search?_id=${documentId}`);
    }
}
