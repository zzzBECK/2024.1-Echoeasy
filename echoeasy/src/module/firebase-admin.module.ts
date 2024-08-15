// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminConfig } from 'src/config/firebase-admin';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FirebaseAdminConfig],
  exports: [FirebaseAdminConfig],
})
export class FirebaseAdminModule {}
