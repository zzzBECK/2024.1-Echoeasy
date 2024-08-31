import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Assunto extends Document {
  @Prop({ required: true })
  document_id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  category: string[];

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  algorithm_link: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AssuntosSchema = SchemaFactory.createForClass(Assunto);
