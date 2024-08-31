import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AlgoritmoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsArray()
  arvore_decisao: Types.ObjectId[];
}
