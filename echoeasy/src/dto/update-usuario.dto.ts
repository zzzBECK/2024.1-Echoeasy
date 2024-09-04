import { IsEmail, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  cellphone: string;
}
