import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlgoritmoController } from 'src/controller/algoritmo.controller';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo, AlgoritmoSchema } from 'src/schema/Algoritmo';
import { AlgoritmoService } from 'src/service/algoritmo.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Algoritmo.name, schema: AlgoritmoSchema },
    ]),
  ],
  controllers: [AlgoritmoController],
  providers: [AlgoritmoService, AlgoritmoRepository],
})
export class AlgoritmoModule {}
