import { ApiService } from "../api/apiService";

export class AlgorithmService extends ApiService {
    async getAllAlgorithms() {
        return this.get(`/algoritmos`);
    }
}
