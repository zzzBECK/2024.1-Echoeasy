import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/service/auth.service';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findUsuarioByEmail(
    @Query('email') email: string,
  ): Promise<Usuario | null> {
    return this.usuarioService.findOne(email);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUsuario(
    @Req() req: any,
    @Body() body: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.authService.updateUsuario(req.headers.authorization, body);
  }
}
