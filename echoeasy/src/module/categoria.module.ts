import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaController } from 'src/controller/categoria.controller';
import { CategoriaRepository } from 'src/repositories/categoria.repository';
import { Categoria, CategoriasSchema } from 'src/schema/Categoria';
import { CategoriaService } from 'src/service/categoria.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriasSchema },
    ]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
})
export class CategoriaModule {}
