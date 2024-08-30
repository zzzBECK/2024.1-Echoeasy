import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { CategoriaRepository } from 'src/repositories/categoria.repository';
import { Categoria } from 'src/schema/Categoria';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async createCategoria(title: string): Promise<Categoria> {
    try {
      return await this.categoriaRepository.create({ title });
    } catch (error) {
      if (
        error instanceof MongoServerError &&
        error.errorResponse.code === 11000
      ) {
        throw new BadRequestException('Categoria com este título já existe');
      }
      throw new BadRequestException('Erro ao criar categoria');
    }
  }

  async findAllCategorias(): Promise<Categoria[]> {
    try {
      return await this.categoriaRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar categorias');
    }
  }

  async findCategoriaById(id: string): Promise<Categoria> {
    try {
      const categoria = await this.categoriaRepository.findById(id);
      if (!categoria) {
        throw new NotFoundException('Categoria não encontrada');
      }
      return categoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar categoria');
    }
  }

  async updateCategoria(id: string, title: string): Promise<Categoria> {
    try {
      const updatedCategoria = await this.categoriaRepository.update(id, {
        title,
      });
      if (!updatedCategoria) {
        throw new NotFoundException(
          'Categoria não encontrada para atualização',
        );
      }
      return updatedCategoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (
        error instanceof MongoServerError &&
        error.errorResponse.code === 11000
      ) {
        throw new BadRequestException('Categoria com este título já existe');
      }

      throw new BadRequestException('Erro ao atualizar categoria');
    }
  }

  async deleteCategoria(id: string): Promise<Categoria> {
    try {
      const deletedCategoria = await this.categoriaRepository.delete(id);
      if (!deletedCategoria) {
        throw new NotFoundException('Categoria não encontrada para exclusão');
      }
      return deletedCategoria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao excluir categoria');
    }
  }
}
