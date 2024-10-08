import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssuntoController } from 'src/controller/assunto.controller';
import { AssuntoRepository } from 'src/repositories/assunto.repository';
import { DocumentoRepository } from 'src/repositories/documento.repository';
import { Documento, DocumentosSchema } from 'src/schema/Documento';
import { AssuntoService } from 'src/service/assunto.service';
import { Assunto, AssuntosSchema } from '../schema/Assunto';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Assunto.name, schema: AssuntosSchema }]),
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentosSchema },
    ]),
  ],
  controllers: [AssuntoController],
  providers: [AssuntoService, AssuntoRepository, DocumentoRepository],
})
export class AssuntoModule {}
