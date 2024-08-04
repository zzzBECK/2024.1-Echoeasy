import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../schema/Usuario';
import { UsuarioDto } from '../dto/UsuarioDto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async create(usuarioData: UsuarioDto): Promise<Usuario> {
    const usuario = new this.usuarioModel(usuarioData);
    return usuario.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}
