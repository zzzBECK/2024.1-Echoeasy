import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlgoritmoDto } from 'src/dto/AlgoritmoDto';
import { AlgoritmoFilhoDto } from 'src/dto/AlgoritmoFilhoDto';
import { AlgoritmoNoDto } from 'src/dto/AlgoritmoNoDto';
import { Algoritmo } from 'src/schema/Algoritmo';
import { AlgoritmoFilho } from 'src/schema/AlgoritmoFilho';
import { AlgoritmoNo } from 'src/schema/AlgoritmoNo';

@Injectable()
export class AlgoritmoRepository {
  constructor(
    @InjectModel(Algoritmo.name)
    private readonly algoritmoModel: Model<Algoritmo>,
    @InjectModel(AlgoritmoNo.name)
    private readonly algoritmoNoModel: Model<AlgoritmoNo>,
    @InjectModel(AlgoritmoFilho.name)
    private readonly algoritmoFilhoModel: Model<AlgoritmoFilho>,
  ) {}

  async create_algoritmo(algoritmoData: AlgoritmoDto): Promise<Algoritmo> {
    try {
      console.log('algoritmoDataRepo', algoritmoData);
      const algoritmo = new this.algoritmoModel({
        nome: algoritmoData.nome,
        descricao: algoritmoData.descricao,
        arvore_decisao: algoritmoData.arvore_decisao,
      });
      console.log('algoritmoRepo', algoritmo);

      return algoritmo.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create_algoritmo_no(
    algoritmoDataNo: AlgoritmoNoDto,
  ): Promise<AlgoritmoNo> {
    try {
      const algoritmoNo = new this.algoritmoNoModel(algoritmoDataNo);

      return algoritmoNo.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create_algoritmo_filho(
    algoritmoDataFilho: AlgoritmoFilhoDto,
  ): Promise<AlgoritmoFilho> {
    try {
      const algoritmoFilho = new this.algoritmoFilhoModel(algoritmoDataFilho);

      return algoritmoFilho.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
