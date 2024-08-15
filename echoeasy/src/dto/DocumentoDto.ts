import { IsString } from 'class-validator';

export class DocumentoDto {
  @IsString({ message: 'Título inválido' })
  tittle: string;
  @IsString({ message: 'Descrição inválida' })
  description: string;
  @IsString({ message: 'Imagem inválida' })
  image: string;
}
