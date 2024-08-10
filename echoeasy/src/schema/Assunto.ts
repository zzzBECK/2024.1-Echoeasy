import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
export class Assunto extends Document {
  @Prop({ required: true })
  document_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
