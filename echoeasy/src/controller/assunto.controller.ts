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
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { MulterFile } from 'src/types/File';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { AssuntoDto } from '../dto/AssuntoDto';
import { Assunto } from '../schema/Assunto';
import { AssuntoService } from '../service/assunto.service';

@Controller('assuntos')
@UseGuards(AuthGuard, RolesGuard)
export class AssuntoController {
  constructor(private assuntoService: AssuntoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
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
  async findAssuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    try {
      return this.assuntoService.findOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  @Roles(RolesEnum.ADMIN)
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
  @Roles(RolesEnum.ADMIN)
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
  @Roles(RolesEnum.ADMIN)
  async deleteAssuntoById(@Query('_id') _id: string): Promise<Assunto | null> {
    try {
      return this.assuntoService.deleteOne(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
