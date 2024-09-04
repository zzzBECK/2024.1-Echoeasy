import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { MulterFile } from 'src/types/File';
import { AssuntoDto } from '../dto/AssuntoDto';
import { Assunto } from '../schema/Assunto';
import { AssuntoService } from '../service/assunto.service';

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
  async getAssuntos(
    @Query('document_id') documentId?: string,
  ): Promise<Assunto[]> {
    try {
      if (documentId) {
        return await this.assuntoService.findAllByDocumentId(documentId);
      }
      return await this.assuntoService.findAll();
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

  @Post('update_photo')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  async uploadPhoto(
    @Query('_id') _id: string,
    @UploadedFile() file: MulterFile,
  ): Promise<Assunto> {
    try {
      return this.assuntoService.updatePhoto(_id, file);
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
