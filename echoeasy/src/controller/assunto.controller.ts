import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Assunto } from '../schema/Assunto';
import { AssuntoService } from '../service/assunto.service';
import { AssuntoDto } from '../dto/AssuntoDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'src/types/File';

@Controller('assuntos')
export class AssuntoController {
  constructor(private assuntoService: AssuntoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  async criarAssunto(
    @Body() assuntoData: AssuntoDto,
    @UploadedFile() file: MulterFile,
  ): Promise<Assunto> {
    return this.assuntoService.create(assuntoData, file);
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
