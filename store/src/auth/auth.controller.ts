import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from './dto/sign.in.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  signIn(@Res({ passthrough: true }) res: Response, @Body() signInfo: SignInDto) {
    return this.authService.signIn(res, signInfo);
  }
}
