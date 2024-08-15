import { IsString } from 'class-validator';

export class DocumentoDto {
  @IsString({ message: 'Título inválido' })
  title: string;
  @IsString({ message: 'Descrição inválida' })
  description: string;
  @IsString({ message: 'Imagem inválida' })
  image: string;
}
