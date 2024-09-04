import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class AssuntoDto {
  @IsString({ message: 'ID inválido' })
  document_id: string;

  @IsString({ message: 'Título inválido' })
  title: string;

  @IsString({ message: 'Descrição inválida' })
  description: string;

  @IsString({ message: 'Imagem inválida' })
  @IsOptional()
  image: string;

  @IsString({ message: 'Link do algoritmo inválido' })
  algorithm_link: string;

  @IsNumberString({}, { message: 'Ordem inválida' })
  order: number;
}
