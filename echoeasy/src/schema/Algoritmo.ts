import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export class Algoritmo extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AlgoritmoNo' }], default: [] })
  arvore_decisao: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AlgoritmoSchema = SchemaFactory.createForClass(Algoritmo);
