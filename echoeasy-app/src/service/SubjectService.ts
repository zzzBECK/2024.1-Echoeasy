import { ApiService } from "../api/apiService";

export class SubjectService extends ApiService {
  async getAllSubjectsOfTheDocument(documentId: string) {
    return this.get(`/assuntos/all?document_id=${documentId}`);
  }

  async getSubjectContent(subjectId: string) {
    return this.get(`/assuntos/search?_id=${subjectId}`);
  }
}
