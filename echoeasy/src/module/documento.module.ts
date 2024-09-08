import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentoController } from 'src/controller/documento.controller';
import { AssuntoRepository } from 'src/repositories/assunto.repository';
import { DocumentoRepository } from 'src/repositories/documento.repository';
import { Assunto, AssuntosSchema } from 'src/schema/Assunto';
import { Documento, DocumentosSchema } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentosSchema },
      { name: Assunto.name, schema: AssuntosSchema },
    ]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService, DocumentoRepository, AssuntoRepository],
})
export class DocumentoModule {}
