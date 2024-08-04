import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/echoeazy'),
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
