import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Algoritmo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  nodes: Types.ObjectId[];
}

export const AlgoritmoSchema = SchemaFactory.createForClass(Algoritmo);
