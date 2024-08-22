import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.documentoService.create(documentoData, file);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getDocumentos(): Promise<Documento[]> {
    return this.documentoService.findAll();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    return this.documentoService.findOneById(_id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateDocumento(
    @Query('_id') _id: string,
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    return this.documentoService.updateOne(_id, documentoData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    return this.documentoService.deleteOne(_id);
  }
}
