import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adminApp, adminStorage } from 'src/config/firebase-admin';
import { UsuarioDto } from 'src/dto/UsuarioDto';
import { MulterFile } from 'src/types/File';
import { Usuario } from '../schema/Usuario';

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
      const fileName = `${Date.now().toString()}`;
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

  async findOneById(_id: string): Promise<Usuario | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.usuarioModel.findOne({ _id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteImage(imagePath: string): Promise<boolean> {
    try {
      if (!imagePath) {
        throw new HttpException('Link Inválido', HttpStatus.BAD_REQUEST);
      }

      const parsedUrl = new URL(imagePath);
      const relativePath = parsedUrl.pathname.replace(
        '/echoeasy-539dc.appspot.com/',
        '',
      );

      await adminStorage.file(relativePath).delete();

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserFirebase(firebase_id: string): Promise<boolean> {
    try {
      if (!firebase_id) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }

      await adminApp.auth().deleteUser(firebase_id);

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<Usuario> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      const usuario = await this.usuarioModel.findOneAndDelete({ _id }).exec();
      if (!usuario) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return usuario;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateRole(_id: string, role: string): Promise<Usuario> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      if (!role) {
        throw new HttpException('Função inválido', HttpStatus.BAD_REQUEST);
      }
      return this.usuarioModel
        .findOneAndUpdate({ _id }, { role }, { new: true })
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
