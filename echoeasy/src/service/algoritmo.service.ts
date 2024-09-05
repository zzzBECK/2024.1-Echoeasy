import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { AlgoritmoCompletoDto } from 'src/dto/AlgoritmoCompletoDto';
import { AlgoritmoDto } from 'src/dto/AlgoritmoDto';
import { AlgoritmoUpdateDto } from 'src/dto/AlgoritmoUpdateDto';
import { NodeDto } from 'src/dto/NodeDto';
import { NodeUpdateDto } from 'src/dto/NodeUpdateDto';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo } from 'src/schema/Algoritmo';
import { Node } from 'src/schema/utils/Node';

@Injectable()
export class AlgoritmoService {
  private readonly logger = new Logger(AlgoritmoService.name);
  constructor(private readonly algoritmoRepository: AlgoritmoRepository) {}

  async createAlgoritmo(algoritmoData: AlgoritmoDto): Promise<Algoritmo> {
    try {
      this.logger.log('Inicializando criação de algoritmo...');
      const algoritmo =
        await this.algoritmoRepository.createAlgoritmo(algoritmoData);
      this.logger.log('Finalizando criação de algoritmo...');

      return algoritmo;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async createNode(nodeData: NodeDto): Promise<Node> {
    try {
      this.logger.log('Inicializando criação de nó...');
      const node = await this.algoritmoRepository.createNode(nodeData);
      await this.algoritmoRepository.LinkNodeIdToAlgoritmo(
        nodeData.algorithm_id,
        node._id as Types.ObjectId,
      );
      this.logger.log('Finalizando criação de nó...');

      return node;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async listAlgoritmos(_id: Types.ObjectId): Promise<AlgoritmoCompletoDto> {
    try {
      this.logger.log('Inicializando listagem de algoritmos...');
      const algoritmos = await this.algoritmoRepository.listAlgoritmos(_id);
      this.logger.log('Finalizando listagem de algoritmos...');

      return algoritmos;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async listAlgoritmosSemNodes(): Promise<Algoritmo[]> {
    try {
      this.logger.log('Inicializando listagem de algoritmos sem nodes...');
      const algoritmos =
        await this.algoritmoRepository.listAlgoritmosSemNodes();
      this.logger.log('Finalizando listagem de algoritmos sem nodes...');

      return algoritmos;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateAlgoritmo(algoritmoData: AlgoritmoUpdateDto): Promise<Algoritmo> {
    try {
      this.logger.log('Inicializando atualização de algoritmo...');
      const algoritmo =
        await this.algoritmoRepository.updateAlgoritmo(algoritmoData);
      this.logger.log('Finalizando atualização de algoritmo...');

      return algoritmo;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateNode(
    _id: Types.ObjectId,
    nodeData: NodeUpdateDto,
  ): Promise<Node> {
    try {
      this.logger.log('Inicializando atualização de nó...');
      const node = await this.algoritmoRepository.updateOneNode(_id, nodeData);
      this.logger.log('Finalizando atualização de nó...');

      return node;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async deleteAlgoritmo(_id: Types.ObjectId): Promise<Algoritmo> {
    try {
      const nodes = await this.algoritmoRepository.listNodesByAlgoritmoId(_id);
      if (nodes.length > 0) {
        await this.algoritmoRepository.deleteManyNodesByAlgorithmId(_id);
      }
      this.logger.log('Inicializando deleção de algoritmo...');
      const algoritmo = await this.algoritmoRepository.deleteAlgoritmo(_id);
      this.logger.log('Finalizando deleção de algoritmo...');

      return algoritmo;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async deleteNode(_id: Types.ObjectId): Promise<Node> {
    try {
      this.logger.log('Inicializando busca de nó...');
      const node = await this.algoritmoRepository.findNodeById(_id);
      this.logger.log('Finalizando busca de nó...');

      this.logger.log('Inicializando deleção de nó...');
      const nodeDeleted = await this.algoritmoRepository.deleteNode(_id);
      this.logger.log('Finalizando deleção de nó...');

      this.logger.log('Inicializando retirada do algoritmo...');
      await this.algoritmoRepository.UnlinkNodeIdFromAlgoritmo(
        node.algorithm_id as Types.ObjectId,
        node._id as Types.ObjectId,
      );
      this.logger.log('Finalizando retirada do algoritmo...');

      return nodeDeleted;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
