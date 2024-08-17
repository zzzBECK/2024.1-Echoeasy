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
  async findDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    return this.documentoService.findOne(_id);
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
