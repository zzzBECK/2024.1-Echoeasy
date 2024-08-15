import { IsString } from 'class-validator';

export class UsuarioDto {
  @IsString({ message: 'Nome inválido' })
  name: string;
  @IsString({ message: 'Email inválido' })
  email: string;
  @IsString({ message: 'Senha inválida' })
  password: string;
}
