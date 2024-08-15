// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from 'src/config/firebase';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FirebaseConfig],
  exports: [FirebaseConfig],
})
export class FirebaseModule {}
