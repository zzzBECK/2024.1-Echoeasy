// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
