import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExceptionMessage } from 'src/common/ custom.exceptions';
import { AuthService } from '../auth.service';
import { Roles } from 'src/domain/user/e.user.role';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();

    const token = this.authService.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(ExceptionMessage.VALUE_IS_EMPTY);
    }

    try {
      const payload = await this.authService.getPayload(token);

      return this.compareRole(payload.role, roles);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiredError(ExceptionMessage.EXPIRED_TOKEN, new Date());
      }
      if (error instanceof JsonWebTokenError) {
        throw new JsonWebTokenError(ExceptionMessage.INVALID_TOKEN, error);
      }
    }
    return false;
  }

  private compareRole(userRole: string, targetRole: string[]) {
    for (const i in targetRole) {
      if (targetRole[i].match(userRole)) {
        return true;
      }
    }
    return false;
  }
}
