import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NodeDto } from './NodeDto';

export class AlgoritmoCompletoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  nodes: NodeDto[];
}
