import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AlgoritmoCompletoDto } from 'src/dto/AlgoritmoCompletoDto';
import { AlgoritmoDto } from 'src/dto/AlgoritmoDto';
import { AlgoritmoUpdateDto } from 'src/dto/AlgoritmoUpdateDto';
import { NodeDto } from 'src/dto/NodeDto';
import { NodeUpdateDto } from 'src/dto/NodeUpdateDto';
import { Algoritmo } from 'src/schema/Algoritmo';
import { Node } from 'src/schema/utils/Node';

@Injectable()
export class AlgoritmoRepository {
  constructor(
    @InjectModel(Algoritmo.name)
    private readonly algoritmoModel: Model<Algoritmo>,
    @InjectModel(Node.name)
    private readonly nodeModel: Model<Node>,
  ) {}

  async createAlgoritmo(algoritmoData: AlgoritmoDto): Promise<Algoritmo> {
    try {
      const algoritmo = new this.algoritmoModel(algoritmoData);

      return algoritmo.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createNode(nodeData: NodeDto): Promise<Node> {
    try {
      const node = new this.nodeModel(nodeData);

      return node.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAlgoritmoById(id: Types.ObjectId): Promise<Algoritmo> {
    try {
      return this.algoritmoModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async LinkNodeIdToAlgoritmo(
    algoritmoId: Types.ObjectId,
    nodeId: Types.ObjectId,
  ): Promise<Algoritmo> {
    try {
      const algoritmo = await this.findAlgoritmoById(algoritmoId);
      algoritmo.nodes.push(nodeId);

      return algoritmo.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async UnlinkNodeIdFromAlgoritmo(
    algoritmoId: Types.ObjectId,
    nodeId: Types.ObjectId,
  ): Promise<Algoritmo> {
    try {
      const algoritmo = await this.findAlgoritmoById(algoritmoId);
      algoritmo.nodes = algoritmo.nodes.filter((node) => !node.equals(nodeId));
      return await algoritmo.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async listAlgoritmos(_id: Types.ObjectId): Promise<AlgoritmoCompletoDto> {
    try {
      const algoritmo = await this.algoritmoModel.findOne({ _id });

      if (!algoritmo) {
        throw new HttpException(
          'Algoritmo não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      const nodes = await this.listNodesByAlgoritmoId(_id);

      const algoritmoWithNodes = {
        title: algoritmo.title,
        description: algoritmo.description,
        nodes: nodes,
      };

      return algoritmoWithNodes;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async listNodesByAlgoritmoId(algoritmoId: Types.ObjectId): Promise<Node[]> {
    try {
      return this.nodeModel
        .find({ algorithm_id: algoritmoId })
        .sort({ node_id: 1 });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findNodeById(node_id: Types.ObjectId): Promise<Node> {
    try {
      return this.nodeModel.findById(node_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async listAlgoritmosSemNodes(): Promise<Algoritmo[]> {
    try {
      return this.algoritmoModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAlgoritmo(algoritmoData: AlgoritmoUpdateDto): Promise<Algoritmo> {
    try {
      return this.algoritmoModel.findOneAndUpdate(
        { _id: algoritmoData._id },
        algoritmoData,
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateOneNode(
    _id: Types.ObjectId,
    documentoData: NodeUpdateDto,
  ): Promise<Node | null> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new Error('ID inválido');
      }
      if (!documentoData) {
        throw new Error('Dados inválidos');
      }
      return this.nodeModel
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteAlgoritmo(_id: Types.ObjectId): Promise<Algoritmo> {
    try {
      return this.algoritmoModel.findByIdAndDelete(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteNode(node_id: Types.ObjectId): Promise<Node> {
    try {
      return this.nodeModel.findByIdAndDelete(node_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteManyNodesByAlgorithmId(
    algorithm_id: Types.ObjectId,
  ): Promise<Node[]> {
    try {
      const nodes = await this.nodeModel.find({ algorithm_id });
      const response = await this.nodeModel.deleteMany({
        algorithm_id: algorithm_id,
      });
      if (response.deletedCount === 0) {
        throw new HttpException('Nenhum nó encontrado', HttpStatus.NOT_FOUND);
      }
      return nodes;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
