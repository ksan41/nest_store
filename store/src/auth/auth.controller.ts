import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignInDto } from './dto/sign.in.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  signIn(@Res({ passthrough: true }) res: Response, @Body() signInfo: SignInDto) {
    return this.authService.signIn(res, signInfo);
  }

  @Post()
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }
}
