import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AssuntoModule } from './assunto.module';
import { AuthModule } from './auth.module';
import { CategoriaModule } from './categoria.module';
import { DocumentoModule } from './documento.module';
import { UsuarioModule } from './usuario.module';
import { AlgoritmoModule } from './algoritmo.module';

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
    CategoriaModule,
    AlgoritmoModule,
  ],
})
export class AppModule {}
