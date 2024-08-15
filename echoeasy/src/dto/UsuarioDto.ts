import { IsEmail, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString()
  name: string;

  @IsString()
  sobrenome: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  firebaseId: string;
}
