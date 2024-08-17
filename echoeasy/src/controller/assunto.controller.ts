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
  async findassuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    return this.assuntoService.findOne(_id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateAssunto(
    @Query('_id') _id: string,
    @Body() assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoService.updateOne(_id, assuntoData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteAssuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    return this.assuntoService.deleteOne(_id);
  }
}
