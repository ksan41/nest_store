import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExceptionMessage, NotFoundException } from 'src/common/ custom.exceptions';
import { authConstants } from 'src/common/constants/constants';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { ShaEncryptionService } from 'src/common/util/sha-encryption.service';
import { TypeCheck } from 'src/common/util/type.check.service';
import { UserService } from 'src/domain/user/service/user.service';
import { Response, Request } from 'express';
import { SignInDto } from './dto/sign.in.dto';
import { PermissionEnum } from './e.permission.enum';
import { PermissionsEntity } from './entity/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/domain/user/e.user.role';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtServcie: JwtService,
    private base64Service: Base64StringService,
    private encryptionService: ShaEncryptionService,
    private configService: ConfigService,
    @InjectRepository(PermissionsEntity) private readonly permissionRepository: Repository<PermissionsEntity>,
  ) {}

  async signIn(res: Response, signInfo: SignInDto) {
    const loadUser = await this.userService.getOneUser(signInfo.id);

    if (TypeCheck.isEmpty(loadUser)) throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
    else {
      if (this.isPasswordCorrect(signInfo.password, loadUser.info.password)) {
        const payload = { sub: loadUser.id, username: loadUser.info.userName, role: loadUser.role };
        const secret = this.configService.get(authConstants.secret);

        const accessExt = this.configService.get(authConstants.accessExpiryTime);
        const refreshExt = this.configService.get(authConstants.refreshExpiryTime);

        const refreshToken = await this.jwtServcie.signAsync({}, { secret: secret, expiresIn: refreshExt });
        const accessToken = {
          access_token: await this.jwtServcie.signAsync(payload, {
            secret: secret,
            expiresIn: accessExt,
          }),
        };

        res.cookie(this.configService.get(authConstants.cookie), refreshToken, { httpOnly: true });
        res.json(accessToken);
        return;
      } else throw new UnauthorizedException(ExceptionMessage.INVALID_USER_INFO);
    }
  }

  private isPasswordCorrect(inputPassword: string, loadPassword: string) {
    const decodepassword = this.base64Service.decode(inputPassword);
    return this.encryptionService.match(decodepassword, loadPassword);
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async getPayload(token: string) {
    return await this.jwtServcie.verifyAsync(token, {
      secret: this.configService.get(authConstants.secret),
    });
  }

  async findPermission(role: UserRole, kind: string, crud: string) {
    return await this.permissionRepository.findOne({
      where: {
        role: role,
        kind: kind,
        crud: PermissionEnum[crud],
      },
    });
  }
}
