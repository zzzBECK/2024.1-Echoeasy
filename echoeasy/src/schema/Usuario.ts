import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ default: Date.now })
  dataCriacao: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
