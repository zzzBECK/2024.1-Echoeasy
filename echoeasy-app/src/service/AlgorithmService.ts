import { ApiService } from "../api/apiService";

export class AlgorithmService extends ApiService {
  async getAllAlgorithms() {
    return this.get(`/algoritmos`);
  }

  async getAlgorithmById(algorithmId: string) {
    return this.get(`/algoritmos/${algorithmId}`);
  }
}
