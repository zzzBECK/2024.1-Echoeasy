import { ApiService } from "../api/apiService";
import { SignInPayload, SignUpPayload } from "../types/User";

export class UsuarioService extends ApiService {
  async create(usuarioData: SignUpPayload) {
    return this.post("/auth/signup/email", usuarioData);
  }

  async login(usuarioData: SignInPayload) {
    return this.post("/auth/signin/email", usuarioData);
  }

  async getMe() {
    return this.get("/auth/me");
  }

  async findAll() {
    return this.get("");
  }
}
