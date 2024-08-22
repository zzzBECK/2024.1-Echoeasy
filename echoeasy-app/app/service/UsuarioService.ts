import { ApiService } from "../api/apiService";
import { SignUpPayload, SignInPayload } from "../types/User";

export class UsuarioService extends ApiService {
  async create(usuarioData: SignUpPayload) {
    return this.post("/auth/signup/email", usuarioData);
  }

  async login(usuarioData: SignInPayload) {
    return this.post("/auth/signin/email", usuarioData);
  }

  async findAll() {
    return this.get("");
  }
}
