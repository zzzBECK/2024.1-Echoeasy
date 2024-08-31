import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class Algoritmo extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AlgoritmoNo' }], default: [] })
  arvore_decisao: Types.ObjectId[];
}

export const AlgoritmoSchema = SchemaFactory.createForClass(Algoritmo);
