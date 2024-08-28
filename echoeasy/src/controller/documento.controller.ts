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
import { DocumentoDto } from '../dto/DocumentoDto';
import { Documento } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';

@Controller('documentos')
export class DocumentoController {
  constructor(private documentoService: DocumentoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  async criarDocumento(
    @Body() documentoData: DocumentoDto,
    @UploadedFile() file: MulterFile,
  ): Promise<Documento> {
    try {
      return this.documentoService.create(documentoData, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getDocumentos(): Promise<Documento[]> {
    try {
      return this.documentoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    try {
      return this.documentoService.findOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateDocumento(
    @Query('_id') _id: string,
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    try {
      return this.documentoService.updateOne(_id, documentoData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    try {
      return this.documentoService.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('category')
  @UseGuards(AuthGuard)
  async updateCategory(
    @Query('documentoId') documentoId: string,
    @Body('newCategory') newCategory: string,
  ): Promise<Documento> {
    return this.documentoService.updateCategory(documentoId, newCategory);
  }

  @Get('category/search')
  @UseGuards(AuthGuard)
  async findDocumentoByCategory(
    @Query('category') category: string,
  ): Promise<Documento[]> {
    try {
      return this.documentoService.findAllByCategory(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('title/search')
  @UseGuards(AuthGuard)
  async findDocumentoByTitle(
    @Query('title') title: string,
  ): Promise<Documento[]> {
    try {
      return this.documentoService.findAllByTitle(title);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
