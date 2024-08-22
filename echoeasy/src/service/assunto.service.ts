import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AssuntoRepository } from '../repositories/assunto.repository';
import { MulterFile } from 'src/types/File';
import { AssuntoDto } from '../dto/AssuntoDto';
import { Assunto } from '../schema/Assunto';
import { DocumentoRepository } from 'src/repositories/documento.repository';

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

  async deleteOne(_id: string): Promise<Assunto | null> {
    try {
      return this.assuntoRepository.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
