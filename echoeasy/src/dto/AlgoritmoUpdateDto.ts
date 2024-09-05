import { IsOptional, IsString } from 'class-validator';

export class AlgoritmoUpdateDto {
  @IsString({ message: '_id inválido' })
  _id: string;

  @IsString({ message: 'Título inválido' })
  @IsOptional()
  title: string;

  @IsString({ message: 'Descrição inválida' })
  @IsOptional()
  description: string;
}
