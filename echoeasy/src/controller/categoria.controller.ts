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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CriarCategoriaDto } from 'src/dto/CategoriaDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Categoria } from 'src/schema/Categoria';
import { CategoriaService } from 'src/service/categoria.service';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Controller('categorias')
@UseGuards(AuthGuard, RolesGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
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
  @Roles(RolesEnum.ADMIN)
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
  @Roles(RolesEnum.ADMIN)
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
