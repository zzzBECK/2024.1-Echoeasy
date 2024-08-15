import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpEmailDto {
  @IsEmail(
    {},
    { message: 'O campo email é obrigatório e deve ser um email válido.' },
  )
  email: string;

  @IsString({ message: 'O campo senha é obrigatório e deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  password: string;

  @IsString({ message: 'O campo nome é obrigatório e deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
  name: string;
}
