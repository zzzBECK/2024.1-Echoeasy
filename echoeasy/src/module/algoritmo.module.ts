import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlgoritmoController } from 'src/controller/algoritmo.controller';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo, AlgoritmoSchema } from 'src/schema/Algoritmo';
import {
  AlgoritmoFilho,
  AlgoritmoFilhoSchema,
} from 'src/schema/AlgoritmoFilho';
import { AlgoritmoNo, AlgoritmoNoSchema } from 'src/schema/AlgoritmoNo';
import { AlgoritmoService } from 'src/service/algoritmo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Algoritmo.name, schema: AlgoritmoSchema },
    ]),
    MongooseModule.forFeature([
      { name: AlgoritmoNo.name, schema: AlgoritmoNoSchema },
    ]),
    MongooseModule.forFeature([
      { name: AlgoritmoFilho.name, schema: AlgoritmoFilhoSchema },
    ]),
  ],
  controllers: [AlgoritmoController],
  providers: [AlgoritmoService, AlgoritmoRepository],
})
export class AlgoritmoModule {}
