import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../schema/Usuario';
import { UsuarioDto } from 'src/dto/UsuarioDto';
import { MulterFile } from 'src/types/File';
import { adminStorage } from 'src/config/firebase-admin';

@Injectable()
export class UsuarioRepository {
  private readonly logger = new Logger(UsuarioRepository.name);

  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(usuarioData: UsuarioDto): Promise<Usuario> {
    this.logger.log('Inicializando criação de usuário...');
    const usuario = new this.usuarioModel(usuarioData);
    this.logger.log('Finalizando criação de usuário...');
    return usuario.save();
  }

  async update(
    email: string,
    updateData: Partial<Usuario>,
  ): Promise<Usuario | null> {
    this.logger.log('Inicializando atualização de usuário...');
    const usuario = await this.usuarioModel
      .findOneAndUpdate(
        { email },
        { ...updateData, updatedAt: new Date() },
        { new: true },
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

  async updatePhoto(_id: string, file: MulterFile): Promise<Usuario> {
    const imageUrl = await this.uploadImage64(file);
    return this.usuarioModel
      .findOneAndUpdate(
        { _id },
        { image: imageUrl, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async uploadImage64(file: MulterFile): Promise<string> {
    const fileName = `${Date.now().toString()}_${file.originalname}`;
    const fileUpload = adminStorage.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          const url = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
          });
          resolve(url[0]);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  }
}
