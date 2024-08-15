import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: any) {
    return this.authService.getMe(req.headers.authorization);
  }
}
