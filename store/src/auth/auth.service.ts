import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExceptionMessage, NotFoundException } from 'src/common/ custom.exceptions';
import { authConstants } from 'src/common/constants/constants';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { ShaEncryptionService } from 'src/common/util/sha-encryption.service';
import { TypeCheck } from 'src/common/util/type.check.service';
import { UserService } from 'src/domain/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtServcie: JwtService,
    private base64Service: Base64StringService,
    private encryptionService: ShaEncryptionService,
    private configService: ConfigService,
  ) {}

  async signIn(id: string, password: string) {
    const loadUser = await this.userService.getOneUser(id);

    if (TypeCheck.isEmpty(loadUser)) throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
    else {
      if (this.isPasswordCorrect(password, loadUser.info.password)) {
        const payload = { sub: loadUser.id, username: loadUser.info.userName, role: loadUser.role };
        const secret = this.configService.get(authConstants.secret);
        const expiryTime = this.configService.get(authConstants.expiryTime);

        const token = {
          access_token: await this.jwtServcie.signAsync(payload, {
            secret: secret,
            expiresIn: expiryTime,
          }),
        };
        return token;
      } else throw new UnauthorizedException(ExceptionMessage.INVALID_USER_INFO);
    }
  }

  private isPasswordCorrect(inputPassword: string, loadPassword: string) {
    const decodepassword = this.base64Service.decode(inputPassword);
    return this.encryptionService.match(decodepassword, loadPassword);
  }
}
