import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AlgoritmoDto } from 'src/dto/AlgoritmoDto';
import { AlgoritmoNoDto } from 'src/dto/AlgoritmoNoDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Algoritmo } from 'src/schema/Algoritmo';
import { AlgoritmoNo } from 'src/schema/AlgoritmoNo';
import { AlgoritmoService } from 'src/service/algoritmo.service';

@Controller('algoritmos')
export class AlgoritmoController {
  constructor(private algoritmoService: AlgoritmoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async criarAlgoritmo(
    @Body() algoritmoData: AlgoritmoDto,
  ): Promise<Algoritmo> {
    try {
      console.log('algoritmoDataControl', algoritmoData);
      return this.algoritmoService.create_algoritmo(algoritmoData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create_no')
  @UseGuards(AuthGuard)
  async criarAlgoritmoNo(
    @Body() algoritmoDataNo: AlgoritmoNoDto,
  ): Promise<AlgoritmoNo> {
    try {
      return this.algoritmoService.create_algoritmo_no(algoritmoDataNo);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
