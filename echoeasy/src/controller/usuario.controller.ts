import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

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
}
