import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlgoritmoController } from 'src/controller/algoritmo.controller';
import { AlgoritmoRepository } from 'src/repositories/algoritmo.repository';
import { Algoritmo, AlgoritmoSchema } from 'src/schema/Algoritmo';
import { Node, NodeSchema } from 'src/schema/Utils/Node';
import { NodeOption, NodeOptionSchema } from 'src/schema/Utils/NodeOption';
import { AlgoritmoService } from 'src/service/algoritmo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Algoritmo.name, schema: AlgoritmoSchema },
      { name: Node.name, schema: NodeSchema },
      { name: NodeOption.name, schema: NodeOptionSchema },
    ]),
  ],
  controllers: [AlgoritmoController],
  providers: [AlgoritmoService, AlgoritmoRepository],
})
export class AlgoritmoModule {}
