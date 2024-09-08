import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Algoritmo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  botLink: string;

  @Prop({ required: false })
  referenceLink: string;
}

export const AlgoritmoSchema = SchemaFactory.createForClass(Algoritmo);
