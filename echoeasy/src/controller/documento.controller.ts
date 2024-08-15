import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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

  @Get()
  async getDocumentos(): Promise<Documento[]> {
    return this.documentoService.findAll();
  }

  @Get('search')
  async findDocumentoByTittle(
    @Query('tittle') tittle: string,
  ): Promise<Documento | null> {
    return this.documentoService.findOne(tittle);
  }
}
