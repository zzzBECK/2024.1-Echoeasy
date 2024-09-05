import { IsString } from 'class-validator';

export class AlgoritmoDto {
  @IsString({ message: 'Título inválido' })
  title: string;

  @IsString({ message: 'Descrição inválida' })
  description: string;
}
