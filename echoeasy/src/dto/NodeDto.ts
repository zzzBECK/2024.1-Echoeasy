import { IsArray, IsString } from 'class-validator';
import { NodeOptionDto } from './NodeOptionDto';
import { Types } from 'mongoose';

export class NodeDto {
  @IsString({ message: 'ID do algoritmo inválido' })
  algorithm_id: Types.ObjectId;

  @IsString({ message: 'ID do nó inválido' })
  node_id: string;

  @IsString({ message: 'Título do nó inválido' })
  node_title: string;

  @IsArray({ message: 'Descrição do nó inválida' })
  node_description: [string];

  @IsArray({ message: 'Opções do nó inválidas' })
  node_options: [NodeOptionDto];
}
