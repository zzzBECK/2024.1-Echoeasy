import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { adminStorage } from 'src/config/firebase-admin';
import { AssuntoDto } from 'src/dto/AssuntoDto';
import { Assunto } from 'src/schema/Assunto';
import { MulterFile } from 'src/types/File';

@Injectable()
export class AssuntoRepository {
  constructor(
    @InjectModel(Assunto.name)
    private readonly assuntoModel: Model<Assunto>,
  ) {}

  async create(assuntoData: AssuntoDto, file: MulterFile): Promise<Assunto> {
    // Fix the function signature
    const imageUrl = await this.uploadImage64(file); // Use the 'file' parameter instead of 'File'
    assuntoData.image = imageUrl;
    const assunto = new this.assuntoModel(assuntoData); // Use 'assuntoData' instead of 'AssuntoDto'

    return assunto.save();
  }

  async findAll(): Promise<Assunto[]> {
    return this.assuntoModel.find().exec();
  }

  async findOne(title: string): Promise<Assunto | null> {
    return this.assuntoModel.findOne({ title }).exec();
  }

  async findOneById(_id: string): Promise<Assunto | null> {
    return this.assuntoModel.findOne({ _id }).exec();
  }

  async updateOne(
    _id: string,
    assuntoData: AssuntoDto,
  ): Promise<Assunto | null> {
    return this.assuntoModel
      .findOneAndUpdate(
        {
          _id,
        },
        assuntoData,
        {
          new: true,
        },
      )
      .exec();
  }

  async deleteOne(_id: string): Promise<Assunto | null> {
    return this.assuntoModel.findOneAndDelete({ _id }).exec();
  }

  async uploadImage64(file: MulterFile): Promise<string> {
    const fileName = `${Date.now().toString()}_${file.originalname}`;
    const fileUpload = adminStorage.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          const url = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
          });
          resolve(url[0]);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  }
}
