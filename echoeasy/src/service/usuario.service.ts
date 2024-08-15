import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}
