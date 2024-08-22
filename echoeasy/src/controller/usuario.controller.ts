import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from 'src/service/auth.service';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
@UseGuards(AuthGuard, RolesGuard)
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  async getUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('search')
  async findUsuarioByEmail(
    @Query('email') email: string,
  ): Promise<Usuario | null> {
    return this.usuarioService.findOne(email);
  }

  @Put()
  async updateUsuario(
    @Req() req: any,
    @Body() body: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.authService.updateUsuario(req.headers.authorization, body);
  }
}
