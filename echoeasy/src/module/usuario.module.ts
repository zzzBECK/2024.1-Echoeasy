import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/service/auth.service';
import { UsuarioController } from '../controller/usuario.controller';
import { Usuario, UsuarioSchema } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
