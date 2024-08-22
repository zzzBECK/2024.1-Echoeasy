import { Injectable, Logger } from '@nestjs/common';
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
    this.logger.log('Inicializando criação de assunto...');
    const verificaDocumento = await this.documentoRepository.findOne(
      assuntoData.document_title,
    );
    if (!verificaDocumento) {
      this.logger.error('Documento não encontrado!');
      throw new Error('Documento não encontrado!');
    }
    const verificaAssunto = await this.assuntoRepository.findOne(
      assuntoData.title,
    );
    if (verificaAssunto) {
      this.logger.error('Insira um novo nome de assunto!');
      throw new Error('Assunto já existe!');
    }
    const assunto = await this.assuntoRepository.create(assuntoData, file);
    this.logger.log('Finalizando criação de assunto...');
    return assunto;
  }

  async findAll(): Promise<Assunto[]> {
    return this.assuntoRepository.findAll();
  }

  async findOne(_id: string): Promise<Assunto | null> {
    return this.assuntoRepository.findOneById(_id);
  }

  async updateOne(
    _id: string,
    assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoRepository.updateOne(_id, assuntoData);
  }

  async deleteOne(_id: string): Promise<Assunto | null> {
    return this.assuntoRepository.deleteOne(_id);
  }
}
