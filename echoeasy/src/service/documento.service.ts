import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documento } from '../schema/Documento';
import { DocumentoDto } from '../dto/DocumentoDto';

@Injectable()
export class DocumentoService {
  private readonly logger = new Logger(DocumentoService.name);
  constructor(
    @InjectModel(Documento.name) private documentoModel: Model<Documento>,
  ) {}

  async create(documentoData: DocumentoDto): Promise<Documento> {
    this.logger.log('Inicializando criação de documento...');
    const verificaDocumento = await this.documentoModel
      .findOne({ title: documentoData.title })
      .exec();
    if (verificaDocumento) {
      this.logger.error('Insira um novo nome de documento!');
      throw new Error('Documento já existe!');
    }
    const documento = new this.documentoModel(documentoData);
    this.logger.log('Finalizando criação de documento...');
    return documento.save();
  }

  async findAll(): Promise<Documento[]> {
    return this.documentoModel.find().exec();
  }

  async findOne(_id: string): Promise<Documento | null> {
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
}
