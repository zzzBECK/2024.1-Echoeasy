import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlgoritmoDto } from 'src/dto/CreateAlgoritmoDto';
import { UpdateAlgoritmoDto } from 'src/dto/UpdateAlgoritmoDto';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo } from 'src/schema/Algoritmo';

@Injectable()
export class AlgoritmoService {
  private readonly logger = new Logger(AlgoritmoService.name);

  constructor(private readonly algoritmoRepository: AlgoritmoRepository) {}

  async create(createAlgoritmoDto: CreateAlgoritmoDto): Promise<Algoritmo> {
    try {
      return await this.algoritmoRepository.create(createAlgoritmoDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Algoritmo[]> {
    try {
      return await this.algoritmoRepository.findAll();
    } catch (error) {
      this.logger.error('Erro ao buscar algoritmos', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Algoritmo> {
    try {
      const algoritmo = await this.algoritmoRepository.findOne(id);
      if (!algoritmo) {
        throw new NotFoundException(`Algoritmo com ID ${id} não encontrado`);
      }
      return algoritmo;
    } catch (error) {
      this.logger.error(`Erro ao buscar o algoritmo com ID ${id}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: string,
    updateAlgoritmoDto: UpdateAlgoritmoDto,
  ): Promise<Algoritmo> {
    await this.findOne(id);
    try {
      return await this.algoritmoRepository.update(id, updateAlgoritmoDto);
    } catch (error) {
      this.logger.error(`Erro ao atualizar o algoritmo com ID ${id}`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    try {
      await this.algoritmoRepository.remove(id);
    } catch (error) {
      this.logger.error(`Erro ao remover o algoritmo com ID ${id}`, error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
