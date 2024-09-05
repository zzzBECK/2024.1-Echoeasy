import { IsString } from 'class-validator';

export class NodeOptionDto {
  @IsString()
  resposta: string;

  @IsString()
  next_node: string;
}
