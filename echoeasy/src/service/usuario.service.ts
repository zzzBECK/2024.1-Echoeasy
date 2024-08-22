import { Injectable, Logger } from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { UsuarioDto } from '../dto/UsuarioDto';
import { Usuario } from '../schema/Usuario';
import { UsuarioRepository } from 'src/repositories/usuario.repository';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private usuarioRepository: UsuarioRepository) {}

  async create(usuarioData: UsuarioDto): Promise<Usuario> {
    this.logger.log('Inicializando criação de usuário...');
    const usuario = await this.usuarioRepository.create(usuarioData);
    this.logger.log('Finalizando criação de usuário...');
    return usuario;
  }

  async update(
    usuarioData: { email: string; name: string; firebaseId: string },
    updateData: UpdateUsuarioDto,
  ): Promise<Usuario | null> {
    this.logger.log('Inicializando atualização de usuário...');
    const usuario = await this.usuarioRepository.update(
      usuarioData.email,
      updateData,
    );
    this.logger.log('Finalizando atualização de usuário...');
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne(email);
  }

  async updatePhoto(_id: string, file: any): Promise<Usuario> {
    return this.usuarioRepository.updatePhoto(_id, file);
  }
}
