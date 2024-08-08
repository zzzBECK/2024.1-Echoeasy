import {ApiService} from "../api/apiService";
import {UserDto} from "../dto/UserDto";

export class UsuarioService extends ApiService{
    async create(usuarioData: UserDto) {
        return this.post('/usuarios', usuarioData)
    }

    async findAll() {
        return this.get('')
    }

}