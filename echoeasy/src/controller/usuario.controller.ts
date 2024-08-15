import { Controller, Get, Query } from '@nestjs/common';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  async getUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('search')
  async findUsuarioByEmail(
    @Query('email') email: string,
  ): Promise<Usuario | null> {
    return this.usuarioService.findOne(email);
  }
}
