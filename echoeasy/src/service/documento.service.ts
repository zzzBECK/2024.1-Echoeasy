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
    const documento = new this.documentoModel(documentoData);
    this.logger.log('Finalizando criação de documento...');
    return documento.save();
  }

  async findAll(): Promise<Documento[]> {
    return this.documentoModel.find().exec();
  }

  async findOne(tittle: string): Promise<Documento | null> {
    return this.documentoModel.findOne({ tittle }).exec();
  }
}
