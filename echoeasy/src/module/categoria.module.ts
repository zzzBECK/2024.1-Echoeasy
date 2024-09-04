import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaController } from 'src/controller/categoria.controller';
import { CategoriaRepository } from 'src/repositories/categoria.repository';
import { Categoria, CategoriasSchema } from 'src/schema/Categoria';
import { Documento, DocumentosSchema } from 'src/schema/Documento';
import { CategoriaService } from 'src/service/categoria.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriasSchema },
    ]),

    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentosSchema },
    ]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
})
export class CategoriaModule {}
