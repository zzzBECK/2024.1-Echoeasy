import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { MulterFile } from 'src/types/File';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { DocumentoDto } from '../dto/DocumentoDto';
import { Documento } from '../schema/Documento';
import { DocumentoService } from '../service/documento.service';

@Controller('documentos')
@UseGuards(AuthGuard, RolesGuard)
export class DocumentoController {
  constructor(private documentoService: DocumentoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Roles(RolesEnum.ADMIN)
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
  async getDocumentos(
    @Query('title') title?: string,
    @Query('categorias') categorias?: string | string[],
  ): Promise<Documento[]> {
    try {
      if (categorias || title) {
        let categoriesArray = [];

        if (categorias) {
          categoriesArray =
            typeof categorias === 'string' ? categorias.split(',') : categorias;
        }

        return this.documentoService.findWithFilters(title, categoriesArray);
      }

      return this.documentoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
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
  @Roles(RolesEnum.ADMIN)
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

  @Post('update_photo')
  @UseInterceptors(FileInterceptor('image'))
  @Roles(RolesEnum.ADMIN)
  async updatePhoto(
    @Query('_id') _id: string,
    @UploadedFile() file: MulterFile,
  ): Promise<Documento> {
    try {
      return this.documentoService.updatePhoto(_id, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  @Roles(RolesEnum.ADMIN)
  async deleteDocumentoById(
    @Query('_id') _id: string,
  ): Promise<Documento | null> {
    try {
      return this.documentoService.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/add-categoria')
  @Roles(RolesEnum.ADMIN)
  async addCategoria(
    @Param('id') id: string,
    @Query('categoriaId') categoriaId: string,
  ): Promise<Documento> {
    try {
      return await this.documentoService.addCategoria(id, categoriaId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/remove-categoria')
  @Roles(RolesEnum.ADMIN)
  async removeCategoria(
    @Param('id') id: string,
    @Query('categoriaId') categoriaId: string,
  ): Promise<Documento> {
    try {
      return await this.documentoService.removeCategoria(id, categoriaId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
