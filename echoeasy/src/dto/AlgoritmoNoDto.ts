import { IsArray, IsEnum, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AlgoritmosEnum } from 'src/utils/enums/algoritmos.enum';

export class AlgoritmoNoDto {
  @IsEnum(AlgoritmosEnum)
  tipo: string;

  @IsString()
  descricao: string;

  @IsArray()
  nos_filhos: Types.ObjectId[];
}
