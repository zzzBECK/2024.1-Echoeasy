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
import { Documento } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';
import { DocumentoDto } from '../dto/DocumentoDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('documentos')
export class DocumentoController {
  constructor(private documentoService: DocumentoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async criarDocumento(
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento> {
    return this.documentoService.create(documentoData);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getDocumentos(): Promise<Documento[]> {
    return this.documentoService.findAll();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async findDocumentoByTitle(
    @Query('title') title: string,
  ): Promise<Documento | null> {
    return this.documentoService.findOne(title);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateDocumento(
    @Query('title') title: string,
    @Body() documentoData: DocumentoDto,
  ): Promise<Documento | null> {
    return this.documentoService.updateOne(title, documentoData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteDocumentoByTitle(
    @Query('title') title: string,
  ): Promise<Documento | null> {
    return this.documentoService.deleteOne(title);
  }
}
