import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { DocumentoRepository } from 'src/repositories/documento.repository';
import { MulterFile } from 'src/types/File';
import { DocumentoDto } from '../dto/DocumentoDto';
import { Documento } from '../schema/Documento';

@Injectable()
export class DocumentoService {
  private readonly logger = new Logger(DocumentoService.name);

  constructor(private readonly documentoRepository: DocumentoRepository) {}

  async create(
    documentoData: DocumentoDto,
    file: MulterFile,
  ): Promise<Documento> {
    try {
      this.logger.log('Inicializando criação de documento...');
      const documento = await this.documentoRepository.create(
        documentoData,
        file,
      );
      this.logger.log('Finalizando criação de documento...');
      return documento;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAllByTitle(title: string): Promise<Documento[]> {
    try {
      return this.documentoRepository.findByDocumentTitle(title);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAll(): Promise<Documento[]> {
    try {
      return this.documentoRepository.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findWithFilters(
    title?: string,
    categorias?: string[],
  ): Promise<Documento[]> {
    try {
      return this.documentoRepository.findWithFilters(title, categorias);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findOne(_id: string): Promise<Documento | null> {
    try {
      return this.documentoRepository.findOneById(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateOne(
    _id: string,
    documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    try {
      return this.documentoRepository.updateOne(_id, documentoData);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updatePhoto(_id: string, file: MulterFile): Promise<Documento> {
    try {
      return this.documentoRepository.updatePhoto(_id, file);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async deleteOne(_id: string): Promise<Documento | null> {
    try {
      return this.documentoRepository.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async addCategoria(_id: string, categoriaId: string): Promise<Documento> {
    try {
      if (!Types.ObjectId.isValid(categoriaId)) {
        throw new Error('ID de categoria inválido');
      }
      return await this.documentoRepository.addCategoria(_id, categoriaId);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async removeCategoria(_id: string, categoriaId: string): Promise<Documento> {
    try {
      if (!Types.ObjectId.isValid(categoriaId)) {
        throw new Error('ID de categoria inválido');
      }
      return await this.documentoRepository.removeCategoria(_id, categoriaId);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
