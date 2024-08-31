import { IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class AlgoritmoFilhoDto {
  @IsArray()
  nos_id: Types.ObjectId[];

  @IsArray()
  condicoes: number[];
}
