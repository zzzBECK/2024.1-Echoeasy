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
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AlgoritmoCompletoDto } from 'src/dto/AlgoritmoCompletoDto';
import { AlgoritmoUpdateDto } from 'src/dto/AlgoritmoUpdateDto';
import { NodeDto } from 'src/dto/NodeDto';
import { NodeUpdateDto } from 'src/dto/NodeUpdateDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Algoritmo } from 'src/schema/Algoritmo';
import { Node } from 'src/schema/utils/Node';
import { AlgoritmoService } from 'src/service/algoritmo.service';
import { AlgoritmoDto } from '../dto/AlgoritmoDto';

@Controller('algoritmos')
export class AlgoritmoController {
  constructor(private algoritmoService: AlgoritmoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async criarAlgoritmo(
    @Body() algoritmoData: AlgoritmoDto,
  ): Promise<Algoritmo> {
    try {
      return this.algoritmoService.createAlgoritmo(algoritmoData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('nodes')
  @UseGuards(AuthGuard)
  async criarNode(@Body() nodeData: NodeDto): Promise<Node> {
    try {
      return this.algoritmoService.createNode(nodeData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @UseGuards(AuthGuard)
  async listarAlgoritmos(
    @Query('_id') _id: Types.ObjectId,
  ): Promise<AlgoritmoCompletoDto> {
    try {
      return this.algoritmoService.listAlgoritmos(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('listAllwithoutNodes')
  @UseGuards(AuthGuard)
  async listarAlgoritmosSemNodes(): Promise<Algoritmo[]> {
    try {
      return this.algoritmoService.listAlgoritmosSemNodes();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async atualizarAlgoritmo(
    @Body() algoritmoData: AlgoritmoUpdateDto,
  ): Promise<Algoritmo> {
    try {
      return this.algoritmoService.updateAlgoritmo(algoritmoData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update_node')
  @UseGuards(AuthGuard)
  async atualizarNode(
    @Query('_id') _id: Types.ObjectId,
    @Body() nodeData: NodeUpdateDto,
  ): Promise<Node> {
    try {
      return this.algoritmoService.updateNode(_id, nodeData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete_algoritmo')
  @UseGuards(AuthGuard)
  async deletarAlgoritmo(
    @Query('_id') _id: Types.ObjectId,
  ): Promise<Algoritmo> {
    try {
      return this.algoritmoService.deleteAlgoritmo(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete_node')
  @UseGuards(AuthGuard)
  async deletarNode(@Query('_id') _id: Types.ObjectId): Promise<Node> {
    try {
      return this.algoritmoService.deleteNode(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
