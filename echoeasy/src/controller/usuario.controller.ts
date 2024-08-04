import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDto } from '../dto/UsuarioDto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criarUsuario(@Body() usuarioData: UsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(usuarioData);
  }

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
