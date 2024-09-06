import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { SignInEmailDto } from 'src/dto/signin-email.dto';
import { SignUpEmailDto } from 'src/dto/signup-email.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup/email')
  async signUpWithEmail(@Body() signUpEmailDto: SignUpEmailDto) {
    return this.authService.signUpWithEmail(signUpEmailDto);
  }

  @Post('signin/email')
  async signInWithEmail(@Body() signInEmailDto: SignInEmailDto) {
    return this.authService.signInWithEmail(
      signInEmailDto.email,
      signInEmailDto.password,
    );
  }

  @Post('reset-password/email')
  async resetPasswordWithEmail(@Body() signInEmailDto: ResetPasswordDto) {
    return this.authService.resetPasswordWithEmail(signInEmailDto.email);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: any) {
    try {
      return this.authService.getMe(req.headers.authorization);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
