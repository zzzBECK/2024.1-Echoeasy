import { ApiService } from "../api/apiService";

export class CategoryService extends ApiService {
    async getAllCategories() {
        return this.get(`/categorias`);
    }
}