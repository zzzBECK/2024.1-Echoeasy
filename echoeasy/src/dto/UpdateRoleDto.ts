import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString({ message: 'ID inválido' })
  _id: string;

  @IsString({ message: 'Role inválido' })
  role: string;
}
