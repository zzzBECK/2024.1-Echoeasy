import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from 'src/schema/Categoria';

@Injectable()
export class CategoriaRepository {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<Categoria>,
  ) {}

  async create(createCategoriaDto: Partial<Categoria>): Promise<Categoria> {
    const categoria = new this.categoriaModel(createCategoriaDto);
    return categoria.save();
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  async findById(id: string): Promise<Categoria> {
    return this.categoriaModel.findById(id).exec();
  }

  async findByIds(ids: string[]): Promise<Categoria[]> {
    return this.categoriaModel.find({ _id: { $in: ids } }).exec();
  }

  async update(
    id: string,
    updateCategoriaDto: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaModel
      .findByIdAndUpdate(id, updateCategoriaDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Categoria> {
    return this.categoriaModel.findByIdAndDelete(id).exec();
  }
}
