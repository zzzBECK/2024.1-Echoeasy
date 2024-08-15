import { IsEmail, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString({ message: 'Nome inválido' })
  name: string;

  @IsString({ message: 'Sobrenome inválido' })
  lastname: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString({ message: 'Celular inválido' })
  cellphone: string;

  @IsString({ message: 'Função inválida' })
  role: string;

  @IsString({ message: 'ID do Firebase inválido' })
  firebaseId: string;
}
