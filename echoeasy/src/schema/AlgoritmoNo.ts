import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { AlgoritmosEnum } from 'src/utils/enums/algoritmos.enum';
import { AlgoritmoFilho } from './AlgoritmoFilho';
import { Document } from 'mongoose';
import { InputAlgoritmoEnum } from 'src/utils/enums/input_algoritmo.enum';

export class AlgoritmoNo extends Document {
  @Prop({ required: true })
  tipo: AlgoritmosEnum;

  @Prop({ required: true })
  tipo_input: InputAlgoritmoEnum;

  @Prop({ required: true })
  descrição: string;

  @Prop({
    type: [{ type: AlgoritmoFilho, ref: 'AlgoritmoFilho' }],
    default: [],
  })
  nos_filhos: AlgoritmoFilho[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AlgoritmoNoSchema = SchemaFactory.createForClass(AlgoritmoNo);
