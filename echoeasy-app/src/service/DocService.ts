import { ApiService } from "../api/apiService";

export class DocService extends ApiService {
    async getAllDocuments() {
        return this.get("/documentos/all");
    }
    async readDocument(documentId: string) {
        return this.get(`/documentos/search?_id=${documentId}`);
    }
}
