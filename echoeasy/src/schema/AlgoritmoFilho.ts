import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class AlgoritmoFilho extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'AlgoritmoNo' }], default: [] })
  nos_id: Types.ObjectId[];

  @Prop({ required: true })
  condicoes: number[];
}

export const AlgoritmoFilhoSchema =
  SchemaFactory.createForClass(AlgoritmoFilho);
