import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { UsuarioDto } from '../dto/UsuarioDto';
import { Usuario } from '../schema/Usuario';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async create(usuarioData: UsuarioDto): Promise<Usuario> {
    this.logger.log('Inicializando criação de usuário...');
    const usuario = new this.usuarioModel(usuarioData);
    this.logger.log('Finalizando criação de usuário...');
    return usuario.save();
  }

  async update(
    usuarioData: { email: string; name: string; firebaseId: string },
    updateData: UpdateUsuarioDto,
  ): Promise<Usuario> {
    this.logger.log('Inicializando atualização de usuário...');
    const usuario = await this.usuarioModel
      .findOneAndUpdate(
        { email: usuarioData.email },
        { ...updateData, updatedAt: new Date() },
        {
          new: true,
        },
      )
      .exec();
    this.logger.log('Finalizando atualização de usuário...');
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}
