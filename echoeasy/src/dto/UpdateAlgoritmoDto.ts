import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateAlgoritmoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  botLink?: string;

  @IsOptional()
  @IsUrl()
  referenceLink?: string;
}
