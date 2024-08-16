import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Assunto } from '../schema/Assunto';
import { AssuntoService } from '../service/assunto.service';
import { AssuntoDto } from '../dto/AssuntoDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('assuntos')
export class AssuntoController {
  constructor(private assuntoService: AssuntoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async criarAssunto(@Body() assuntoData: AssuntoDto): Promise<Assunto> {
    return this.assuntoService.create(assuntoData);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAssuntos(): Promise<Assunto[]> {
    return this.assuntoService.findAll();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findassuntoByTitle(
    @Query('title') title: string,
  ): Promise<Assunto | null> {
    return this.assuntoService.findOne(title);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateAssunto(
    @Query('title') title: string,
    @Body() assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoService.updateOne(title, assuntoData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteAssuntoByTitle(
    @Query('title') title: string,
  ): Promise<Assunto | null> {
    return this.assuntoService.deleteOne(title);
  }
}
