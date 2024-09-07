import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign.in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  signIn(@Body() signInfo: SignInDto) {
    return this.authService.signIn(signInfo.id, signInfo.password);
  }
}
