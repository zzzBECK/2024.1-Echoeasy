import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { Documento } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';
import { DocumentoDto } from '../dto/DocumentoDto';

@Controller('documentos')
export class DocumentoController {
  constructor(private documentoService: DocumentoService) {}

  @Post()
  async criarDocumento(
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento> {
    return this.documentoService.create(documentoData);
  }

  @Get('all')
  async getDocumentos(): Promise<Documento[]> {
    return this.documentoService.findAll();
  }

  @Get('search')
  async findDocumentoByTitle(
    @Query('title') title: string,
  ): Promise<Documento | null> {
    return this.documentoService.findOne(title);
  }

  @Put('update')
  async updateDocumento(
    @Query('title') title: string,
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    return this.documentoService.updateOne(title, documentoData);
  }

  @Delete('delete')
  async deleteDocumentoByTitle(
    @Query('title') title: string,
  ): Promise<Documento | null> {
    return this.documentoService.deleteOne(title);
  }
}
