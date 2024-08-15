// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { FirebaseAdminConfig } from '../config/firebase-admin';
import { UsuarioModule } from './usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../schema/Usuario';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  providers: [AuthService, UsuarioModule],
  controllers: [AuthController],
})
export class AuthModule {}
