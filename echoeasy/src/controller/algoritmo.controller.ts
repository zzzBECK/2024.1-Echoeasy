import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateAlgoritmoDto } from 'src/dto/CreateAlgoritmoDto';
import { UpdateAlgoritmoDto } from 'src/dto/UpdateAlgoritmoDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AlgoritmoService } from 'src/service/algoritmo.service';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Controller('algoritmos')
@UseGuards(AuthGuard, RolesGuard)
export class AlgoritmoController {
  constructor(private readonly algoritmoService: AlgoritmoService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createAlgoritmoDto: CreateAlgoritmoDto) {
    try {
      return await this.algoritmoService.create(createAlgoritmoDto);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.algoritmoService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.algoritmoService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateAlgoritmoDto: UpdateAlgoritmoDto,
  ) {
    try {
      return await this.algoritmoService.update(id, updateAlgoritmoDto);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  async remove(@Param('id') id: string) {
    try {
      return await this.algoritmoService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
