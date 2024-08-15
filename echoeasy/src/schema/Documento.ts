import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
export class Documento extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DocumentosSchema = SchemaFactory.createForClass(Documento);
