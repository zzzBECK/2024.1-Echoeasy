import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { Assunto } from '../schema/Assunto';
import { AssuntoService } from '../service/assunto.service';
import { AssuntoDto } from '../dto/AssuntoDto';

@Controller('assuntos')
export class AssuntoController {
  constructor(private assuntoService: AssuntoService) {}

  @Post()
  async criarAssunto(@Body() assuntoData: AssuntoDto): Promise<Assunto> {
    return this.assuntoService.create(assuntoData);
  }

  @Get('all')
  async getAssuntos(): Promise<Assunto[]> {
    return this.assuntoService.findAll();
  }

  @Get('search')
  async findassuntoByTitle(
    @Query('title') title: string,
  ): Promise<Assunto | null> {
    return this.assuntoService.findOne(title);
  }

  @Put('update')
  async updateAssunto(
    @Query('title') title: string,
    @Body() assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoService.updateOne(title, assuntoData);
  }

  @Delete('delete')
  async deleteAssuntoByTitle(
    @Query('title') title: string,
  ): Promise<Assunto | null> {
    return this.assuntoService.deleteOne(title);
  }
}
