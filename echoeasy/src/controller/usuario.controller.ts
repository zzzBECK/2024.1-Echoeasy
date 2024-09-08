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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from 'src/service/auth.service';
import { MulterFile } from 'src/types/File';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Usuario } from '../schema/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
@UseGuards(AuthGuard, RolesGuard)
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  async getUsuarios(): Promise<Usuario[]> {
    try {
      return this.usuarioService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @Roles(RolesEnum.ADMIN)
  async findUsuarioByEmail(
    @Query('email') email: string,
  ): Promise<Usuario | null> {
    try {
      return this.usuarioService.findOne(email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateUsuario(
    @Req() req: any,
    @Body() body: UpdateUsuarioDto,
  ): Promise<Usuario> {
    try {
      return this.authService.updateUsuario(req.headers.authorization, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update_photo')
  @UseInterceptors(FileInterceptor('image'))
  async updatePhoto(
    @Query('_id') _id: string,
    @UploadedFile() file: MulterFile,
  ): Promise<Usuario> {
    try {
      return this.usuarioService.updatePhoto(_id, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  @Roles(RolesEnum.ADMIN)
  async deleteUsuario(@Query('_id') _id: string): Promise<Usuario> {
    try {
      return this.usuarioService.delete(_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
