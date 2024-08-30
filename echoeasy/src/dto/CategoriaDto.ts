import { IsString } from 'class-validator';

export class CriarCategoriaDto {
  @IsString({ message: 'Título inválido' })
  title: string;
}
