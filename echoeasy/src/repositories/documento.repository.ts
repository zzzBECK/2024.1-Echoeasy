import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const imageUrl = await this.uploadImage64(file);
    documentoData.image = imageUrl;
    const documento = new this.documentoModel(documentoData);

    return documento.save();
  }

  async findAll(): Promise<Documento[]> {
    return this.documentoModel.find().exec();
  }

  async findOne(title: string): Promise<Documento | null> {
    return this.documentoModel.findOne({ title }).exec();
  }

  async findOneById(_id: string): Promise<Documento | null> {
    return this.documentoModel.findOne({ _id }).exec();
  }

  async updateOne(
    _id: string,
    documentoData: DocumentoDto,
  ): Promise<Documento | null> {
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
  }

  async deleteOne(_id: string): Promise<Documento | null> {
    return this.documentoModel.findOneAndDelete({ _id }).exec();
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
