import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriarCategoriaDto } from 'src/dto/CategoriaDto';
import { Categoria } from 'src/schema/Categoria';
import { CategoriaService } from 'src/service/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() body: CriarCategoriaDto): Promise<Categoria> {
    try {
      return await this.categoriaService.createCategoria(body.title);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Categoria[]> {
    try {
      return await this.categoriaService.findAllCategorias();
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar categorias',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Categoria> {
    try {
      return await this.categoriaService.findCategoriaById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
  ): Promise<Categoria> {
    try {
      return await this.categoriaService.updateCategoria(id, title);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Categoria> {
    try {
      return await this.categoriaService.deleteCategoria(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Categoria não encontrada para exclusão',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Erro ao excluir categoria',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
