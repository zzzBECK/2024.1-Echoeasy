// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { Usuario, UsuarioSchema } from '../schema/Usuario';
import { UsuarioModule } from './usuario.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  providers: [AuthService, UsuarioModule],
  controllers: [AuthController],
})
export class AuthModule {}
