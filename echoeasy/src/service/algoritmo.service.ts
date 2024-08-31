import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AlgoritmoDto } from 'src/dto/AlgoritmoDto';
import { AlgoritmoNoDto } from 'src/dto/AlgoritmoNoDto';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo } from 'src/schema/Algoritmo';
import { AlgoritmoNo } from 'src/schema/AlgoritmoNo';

@Injectable()
export class AlgoritmoService {
  private readonly logger = new Logger(AlgoritmoService.name);
  constructor(private readonly algoritmoRepository: AlgoritmoRepository) {}

  async create_algoritmo(algoritmoData: AlgoritmoDto): Promise<Algoritmo> {
    try {
      this.logger.log('Inicializando criação de algoritmo...');
      this.logger.log('algoritmoDataServ', algoritmoData);
      const algoritmo =
        await this.algoritmoRepository.create_algoritmo(algoritmoData);
      this.logger.log('Finalizando criação de algoritmo...');
      return algoritmo;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async create_algoritmo_no(
    algoritmoDataNo: AlgoritmoNoDto,
  ): Promise<AlgoritmoNo> {
    try {
      this.logger.log('Inicializando criação de algoritmo no...');
      const algoritmoNo =
        await this.algoritmoRepository.create_algoritmo_no(algoritmoDataNo);
      this.logger.log('Finalizando criação de algoritmo no...');
      return algoritmoNo;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async create_algoritmo_filho(algoritmoDataFilho: any): Promise<any> {
    try {
      this.logger.log('Inicializando criação de algoritmo filho...');
      const algoritmoFilho =
        await this.algoritmoRepository.create_algoritmo_filho(
          algoritmoDataFilho,
        );
      this.logger.log('Finalizando criação de algoritmo filho...');
      return algoritmoFilho;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
