import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { adminStorage } from 'src/config/firebase-admin';
import { MulterFile } from 'src/types/File';
import { DocumentoDto } from '../dto/DocumentoDto';
import { Documento } from '../schema/Documento';

@Injectable()
export class DocumentoRepository {
  constructor(
    @InjectModel(Documento.name)
    private readonly documentoModel: Model<Documento>,
  ) {}

  async create(
    documentoData: DocumentoDto,
    file: MulterFile,
  ): Promise<Documento> {
    try {
      if (!documentoData) {
        throw new Error('Dados inválidos');
      }

      if (file) {
        const imageUrl = await this.uploadImage64(file);
        documentoData.image = imageUrl;
      }

      const documento = new this.documentoModel(documentoData);

      return documento.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByDocumentTitle(title: string): Promise<Documento[]> {
    try {
      if (!title) {
        throw new Error('Título inválido');
      }
      return this.documentoModel
        .find({ title: { $regex: title, $options: 'i' } })
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async save(documento: Documento): Promise<Documento> {
    return documento.save();
  }

  async findById(_id: string): Promise<Documento> {
    return this.documentoModel.findOne({ _id }).exec();
  }

  async findAll(): Promise<Documento[]> {
    try {
      return this.documentoModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(title: string): Promise<Documento | null> {
    try {
      if (!title) {
        throw new Error('Título inválido');
      }
      return this.documentoModel.findOne({ title }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOneById(_id: string): Promise<Documento | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      return this.documentoModel.findOne({ _id }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async updateOne(
    _id: string,
    documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      if (!documentoData) {
        throw new Error('Dados inválidos');
      }
      return this.documentoModel
        .findOneAndUpdate(
          {
            _id,
          },
          documentoData,
          {
            new: true,
          },
        )
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOne(_id: string): Promise<Documento | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      return this.documentoModel.findOneAndDelete({ _id }).exec();
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

  async addCategoria(
    _id: string,
    categoriaId: string,
  ): Promise<Documento | null> {
    try {
      return this.documentoModel
        .findByIdAndUpdate(
          _id,
          { $addToSet: { categorias: categoriaId } },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeCategoria(
    _id: string,
    categoriaId: string,
  ): Promise<Documento | null> {
    try {
      return this.documentoModel
        .findByIdAndUpdate(
          _id,
          { $pull: { categorias: categoriaId } },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
