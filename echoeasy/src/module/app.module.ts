import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { UsuarioModule } from './usuario.module';
import { DocumentoModule } from './documento.module';
import { AssuntoModule } from './assunto.module';

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
    AuthModule,
    AssuntoModule,
    UsuarioModule,
    DocumentoModule,
  ],
})
export class AppModule {}
