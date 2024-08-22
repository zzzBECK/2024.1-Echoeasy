import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    try {
      if (await this.findOne(usuarioData.email)) {
        throw new HttpException(
          'Usuário já cadastrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.logger.log('Inicializando criação de usuário...');
      const usuario = new this.usuarioModel(usuarioData);
      this.logger.log('Finalizando criação de usuário...');
      return usuario.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    email: string,
    updateData: Partial<Usuario>,
  ): Promise<Usuario | null> {
    try {
      if (!(await this.findOne(email))) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      if (!updateData) {
        throw new HttpException(
          'Nenhum dado para atualizar',
          HttpStatus.BAD_REQUEST,
        );
      }
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return this.usuarioModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(email: string): Promise<Usuario | null> {
    try {
      if (email === undefined || email === null) {
        throw new HttpException('Email inválido', HttpStatus.BAD_REQUEST);
      }
      return this.usuarioModel.findOne({ email }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async updatePhoto(_id: string, file: MulterFile): Promise<Usuario> {
    try {
      if (!file) {
        throw new HttpException(
          'Nenhuma imagem enviada',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!file.buffer) {
        throw new HttpException('Imagem inválida', HttpStatus.BAD_REQUEST);
      }
      if (!Types.ObjectId.isValid(_id)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }

      const imageUrl = await this.uploadImage64(file);
      return this.usuarioModel
        .findOneAndUpdate(
          { _id },
          { image: imageUrl, updatedAt: new Date() },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async uploadImage64(file: MulterFile): Promise<string> {
    try {
      if (!file) {
        throw new HttpException(
          'Nenhuma imagem enviada',
          HttpStatus.BAD_REQUEST,
        );
      }
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
