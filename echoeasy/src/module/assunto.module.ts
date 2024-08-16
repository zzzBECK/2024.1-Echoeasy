import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Assunto, AssuntosSchema } from '../schema/Assunto';
import { AssuntoController } from 'src/controller/assunto.controller';
import { AssuntoService } from 'src/service/assunto.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assunto.name, schema: AssuntosSchema }]),
  ],
  controllers: [AssuntoController],
  providers: [AssuntoService],
})
export class AssuntoModule {}
