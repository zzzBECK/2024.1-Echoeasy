import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAlgoritmoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUrl()
  botLink: string;

  @IsOptional()
  @IsUrl()
  referenceLink?: string;
}
