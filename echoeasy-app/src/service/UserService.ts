import { ApiService } from "../api/apiService";
import { SignInPayload, SignUpPayload } from "../types/User";

export class UserService extends ApiService {
  async create(userData: SignUpPayload) {
    return this.post("/auth/signup/email", userData);
  }

  async login(userData: SignInPayload) {
    return this.post("/auth/signin/email", userData);
  }

  async getMe() {
    return this.get("/auth/me");
  }

  async findAll() {
    return this.get("");
  }
}
