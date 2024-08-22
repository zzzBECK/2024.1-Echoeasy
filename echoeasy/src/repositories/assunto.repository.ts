import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adminStorage } from 'src/config/firebase-admin';
import { AssuntoDto } from 'src/dto/AssuntoDto';
import { Assunto } from 'src/schema/Assunto';
import { Documento } from 'src/schema/Documento';
import { MulterFile } from 'src/types/File';

@Injectable()
export class AssuntoRepository {
  constructor(
    @InjectModel(Assunto.name)
    private readonly assuntoModel: Model<Assunto>,
    @InjectModel(Documento.name)
    private readonly documentoModel: Model<Documento>,
  ) {}

  async create(assuntoData: AssuntoDto, file: MulterFile): Promise<Assunto> {
    try {
      if (!(await this.validateDocumento(assuntoData.document_id))) {
        throw new Error('Documento não encontrado.');
      }
      const imageUrl = await this.uploadImage64(file);
      assuntoData.image = imageUrl;
      const assunto = new this.assuntoModel(assuntoData);

      return assunto.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async validateDocumento(document_id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(document_id)) {
        throw new Error('ID inválido');
      }

      const documento = await this.documentoModel.findOne({ _id: document_id });
      if (!documento) {
        throw new Error('Documento não encontrado');
      }
      return documento !== null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Assunto[]> {
    try {
      return this.assuntoModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(_id: string): Promise<Assunto | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      return this.assuntoModel.findOne({ _id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async updateOne(
    _id: string,
    assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      if (!assuntoData) {
        throw new Error('Dados inválidos');
      }
      return this.assuntoModel
        .findOneAndUpdate(
          {
            _id,
          },
          assuntoData,
          {
            new: true,
          },
        )
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOne(_id: string): Promise<Assunto | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      return this.assuntoModel.findOneAndDelete({ _id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async uploadImage64(file: MulterFile): Promise<string> {
    try {
      if (!file) {
        throw new Error('Arquivo inválido');
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
