import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email: string;

  @IsString({ message: 'Nome inválido' })
  @IsOptional()
  name: string;

  @IsString({ message: 'Sobrenome inválido' })
  @IsOptional()
  lastname: string;

  @IsNumberString({}, { message: 'Telefone inválido' })
  @IsOptional()
  cellphone: string;
}
