import { IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString({ message: 'Nome inválido' })
  nome: string;
  @IsString({ message: 'Email inválido' })
  email: string;
  @IsString({ message: 'Senha inválida' })
  senha: string;
}
