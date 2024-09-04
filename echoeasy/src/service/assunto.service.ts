import { HttpException, Injectable, Logger } from '@nestjs/common';
import { DocumentoRepository } from 'src/repositories/documento.repository';
import { MulterFile } from 'src/types/File';
import { AssuntoDto } from '../dto/AssuntoDto';
import { AssuntoRepository } from '../repositories/assunto.repository';
import { Assunto } from '../schema/Assunto';

@Injectable()
export class AssuntoService {
  private readonly logger = new Logger(AssuntoService.name);
  constructor(
    private readonly assuntoRepository: AssuntoRepository,
    private readonly documentoRepository: DocumentoRepository,
  ) {}

  async create(assuntoData: AssuntoDto, file: MulterFile): Promise<Assunto> {
    try {
      this.logger.log('Inicializando criação de assunto...');
      const assunto = await this.assuntoRepository.create(assuntoData, file);
      this.logger.log('Finalizando criação de assunto...');
      return assunto;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAllByTitle(title: string): Promise<Assunto[]> {
    try {
      return this.assuntoRepository.findByAssuntoTitle(title);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAllByDocumentId(documentId: string): Promise<Assunto[]> {
    try {
      return this.assuntoRepository.findByDocumentId(documentId);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAll(): Promise<Assunto[]> {
    try {
      return this.assuntoRepository.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findOne(_id: string): Promise<Assunto | null> {
    try {
      return this.assuntoRepository.findOne(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateOne(
    _id: string,
    assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    try {
      return this.assuntoRepository.updateOne(_id, assuntoData);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updatePhoto(_id: string, file: MulterFile): Promise<Assunto | null> {
    try {
      return this.assuntoRepository.updatePhoto(_id, file);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async deleteOne(_id: string): Promise<Assunto | null> {
    try {
      return this.assuntoRepository.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
