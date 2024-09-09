import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { UsuarioRepository } from 'src/repositories/usuario.repository';
import { UsuarioDto } from '../dto/UsuarioDto';
import { Usuario } from '../schema/Usuario';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private usuarioRepository: UsuarioRepository) {}

  async create(usuarioData: UsuarioDto): Promise<Usuario> {
    try {
      this.logger.log('Inicializando criação de usuário...');
      const usuario = await this.usuarioRepository.create(usuarioData);
      this.logger.log('Finalizando criação de usuário...');
      return usuario;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(
    usuarioData: { email: string; name: string; firebaseId: string },
    updateData: UpdateUsuarioDto,
  ): Promise<Usuario | null> {
    try {
      this.logger.log('Inicializando atualização de usuário...');
      const usuario = await this.usuarioRepository.update(
        usuarioData.email,
        updateData,
      );
      this.logger.log('Finalizando atualização de usuário...');
      return usuario;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return this.usuarioRepository.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findOne(email: string): Promise<Usuario | null> {
    try {
      return this.usuarioRepository.findOne(email);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updatePhoto(_id: string, file: any): Promise<Usuario> {
    try {
      const user = await this.usuarioRepository.findOneById(_id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      if (user.image) {
        await this.usuarioRepository.deleteImage(user.image);
      }

      return this.usuarioRepository.updatePhoto(_id, file);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(_id: string): Promise<Usuario> {
    try {
      const user = await this.usuarioRepository.findOneById(_id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const image_path = user.image;
      if (image_path) {
        await this.usuarioRepository.deleteImage(image_path);
      }

      const userFirebaseId = user.firebaseId;
      if (userFirebaseId) {
        await this.usuarioRepository.deleteUserFirebase(userFirebaseId);
      }

      return this.usuarioRepository.delete(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateRole(_id: string, role: string): Promise<Usuario> {
    try {
      return this.usuarioRepository.updateRole(_id, role);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
