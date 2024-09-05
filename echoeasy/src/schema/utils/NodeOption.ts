import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NodeOption extends Document {
  @Prop({ required: true })
  resposta: string;

  @Prop({ required: true })
  next_node: string;
}

export const NodeOptionSchema = SchemaFactory.createForClass(NodeOption);
