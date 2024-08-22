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
  HttpException,
  HttpStatus,
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
    try {
      return this.assuntoService.create(assuntoData, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAssuntos(): Promise<Assunto[]> {
    try {
      return this.assuntoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findAssuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    try {
      return this.assuntoService.findOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateAssunto(
    @Query('_id') _id: string,
    @Body() assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    try {
      return this.assuntoService.updateOne(_id, assuntoData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteAssuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    try {
      return this.assuntoService.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
