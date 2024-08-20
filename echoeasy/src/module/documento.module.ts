import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentosSchema } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';
import { DocumentoController } from 'src/controller/documento.controller';
import { DocumentoRepository } from 'src/repositories/documento.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentosSchema },
    ]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService, DocumentoRepository],
})
export class DocumentoModule {}
