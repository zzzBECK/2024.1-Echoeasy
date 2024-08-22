import { ApiService } from "../api/apiService";
import { SignUpPayload, SignInPayload } from "../types/User";

export class UsuarioService extends ApiService {
  async create(usuarioData: SignUpPayload) {
    try{

      return this.post("/auth/signup/email", usuarioData);
    }catch(error){
      console.log(error);
    }
  }

  async login(usuarioData: SignInPayload) {
    return this.post("/auth/signin/email", usuarioData);
  }

  async findAll() {
    return this.get("");
  }
}
