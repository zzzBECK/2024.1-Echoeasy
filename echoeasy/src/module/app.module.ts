import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { FirebaseAdminModule } from './firebase-admin.module';
import { FirebaseModule } from './firebase.module';
import { UsuarioModule } from './usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    AuthModule,
    FirebaseAdminModule,
    FirebaseModule,
  ],
})
export class AppModule {}
