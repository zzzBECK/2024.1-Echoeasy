import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AlgoritmosEnum } from 'src/utils/enums/algoritmos.enum';
import { AlgoritmoFilho } from './AlgoritmoFilho';
import { Document } from 'mongoose';
import { InputAlgoritmoEnum } from 'src/utils/enums/input_algoritmo.enum';

@Schema()
export class AlgoritmoNo extends Document {
  @Prop({ required: true })
  tipo: AlgoritmosEnum;

  @Prop({ required: true })
  tipo_input: InputAlgoritmoEnum;

  @Prop({ required: true })
  descricao: string;

  @Prop({
    type: [{ type: AlgoritmoFilho, ref: 'AlgoritmoFilho' }],
    default: [],
  })
  nos_filhos: AlgoritmoFilho[];
}

export const AlgoritmoNoSchema = SchemaFactory.createForClass(AlgoritmoNo);
