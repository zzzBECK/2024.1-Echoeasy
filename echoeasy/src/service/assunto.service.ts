import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assunto } from '../schema/Assunto';
import { AssuntoDto } from '../dto/AssuntoDto';

@Injectable()
export class AssuntoService {
  private readonly logger = new Logger(AssuntoService.name);
  constructor(
    @InjectModel(Assunto.name) private assuntoModel: Model<Assunto>,
  ) {}

  async create(assuntoData: AssuntoDto): Promise<Assunto> {
    this.logger.log('Inicializando criação de assunto...');
    const verificaAssunto = await this.assuntoModel
      .findOne({ title: assuntoData.title })
      .exec();
    if (verificaAssunto) {
      this.logger.error('Insira um novo nome de assunto!');
      throw new Error('Assunto já existe!');
    }

    return this.assuntoModel.create(assuntoData);
  }

  async findAll(): Promise<Assunto[]> {
    return this.assuntoModel.find().exec();
  }

  async findOne(_id: string): Promise<Assunto | null> {
    return this.assuntoModel.findOne({ _id }).exec();
  }

  async updateOne(
    _id: string,
    assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoModel
      .findOneAndUpdate(
        {
          _id,
        },
        assuntoData,
        {
          new: true,
        },
      )
      .exec();
  }

  async deleteOne(_id: string): Promise<Assunto | null> {
    return this.assuntoModel.findOneAndDelete({ _id }).exec();
  }
}
