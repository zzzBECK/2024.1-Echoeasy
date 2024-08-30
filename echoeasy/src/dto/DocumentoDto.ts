import { IsArray, IsOptional, IsString } from 'class-validator';

export class DocumentoDto {
  @IsString({ message: 'Título inválido' })
  title: string;

  @IsString({ message: 'Descrição inválida' })
  description: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsArray()
  categorias: string[];
}
