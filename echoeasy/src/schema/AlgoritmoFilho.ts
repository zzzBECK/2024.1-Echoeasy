import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export class AlgoritmoFilho extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'AlgoritmoNo' }], default: [] })
  nos_id: Types.ObjectId[];

  @Prop({ required: true })
  condicoes: number[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AlgoritmoFilhoSchema =
  SchemaFactory.createForClass(AlgoritmoFilho);
