import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentosSchema } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';
import { DocumentoController } from 'src/controller/documento.controller';
import { DocumentoRepository } from 'src/repositories/documento.repository';
import { AssuntoRepository } from 'src/repositories/assunto.repository';
import { Assunto, AssuntosSchema } from 'src/schema/Assunto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentosSchema },
      { name: Assunto.name, schema: AssuntosSchema },
    ]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService, DocumentoRepository, AssuntoRepository],
})
export class DocumentoModule {}
