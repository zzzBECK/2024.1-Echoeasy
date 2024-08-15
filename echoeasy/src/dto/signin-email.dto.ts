import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
