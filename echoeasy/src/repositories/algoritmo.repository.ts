import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlgoritmoDto } from 'src/dto/CreateAlgoritmoDto';
import { UpdateAlgoritmoDto } from 'src/dto/UpdateAlgoritmoDto';
import { Algoritmo } from 'src/schema/Algoritmo';

@Injectable()
export class AlgoritmoRepository {
  constructor(
    @InjectModel(Algoritmo.name)
    private readonly algoritmoModel: Model<Algoritmo>,
  ) {}

  async create(createAlgoritmoDto: CreateAlgoritmoDto): Promise<Algoritmo> {
    try {
      const createdAlgoritmo = new this.algoritmoModel(createAlgoritmoDto);
      return await createdAlgoritmo.save();
    } catch (error) {
      throw new HttpException(
        `Erro ao criar o algoritmo: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Algoritmo[]> {
    try {
      return await this.algoritmoModel.find().exec();
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar os algoritmos: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Algoritmo> {
    try {
      const algoritmo = await this.algoritmoModel.findById(id).exec();
      if (!algoritmo) {
        throw new HttpException(
          `Algoritmo com ID ${id} não encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }
      return algoritmo;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar o algoritmo com ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateAlgoritmoDto: UpdateAlgoritmoDto,
  ): Promise<Algoritmo> {
    try {
      const updatedAlgoritmo = await this.algoritmoModel
        .findByIdAndUpdate(id, updateAlgoritmoDto, { new: true })
        .exec();
      if (!updatedAlgoritmo) {
        throw new HttpException(
          `Algoritmo com ID ${id} não encontrado para atualização`,
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedAlgoritmo;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar o algoritmo com ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.algoritmoModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new HttpException(
          `Algoritmo com ID ${id} não encontrado para remoção`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Erro ao remover o algoritmo com ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
