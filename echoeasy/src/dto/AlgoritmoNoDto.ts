import { IsArray, IsEnum, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AlgoritmosEnum } from 'src/utils/enums/algoritmos.enum';
import { InputAlgoritmoEnum } from 'src/utils/enums/input_algoritmo.enum';

export class AlgoritmoNoDto {
  @IsEnum(AlgoritmosEnum)
  tipo: string;

  @IsString()
  descricao: string;

  @IsEnum(InputAlgoritmoEnum)
  tipo_input: string;

  @IsArray()
  nos_filhos: Types.ObjectId[];
}
