import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { NodeOptionDto } from './NodeOptionDto';
import { Type } from 'class-transformer';

export class NodeUpdateDto {
  @IsString({ message: 'ID do algoritmo inválido' })
  @IsOptional()
  algorithm_id: Types.ObjectId;

  @IsString({ message: 'ID do nó inválido' })
  @IsOptional()
  node_id: string;

  @IsString({ message: 'Título do nó inválido' })
  @IsOptional()
  node_title: string;

  @IsString({ message: 'Descrição do nó inválida' })
  @IsOptional()
  node_description: string;

  @IsArray({ message: 'Opções do nó devem ser um array' })
  @ValidateNested({ each: true })
  @Type(() => NodeOptionDto)
  @IsOptional()
  node_options: NodeOptionDto[];
}
