import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExceptionMessage } from 'src/common/ custom.exceptions';
import { AuthService } from '../auth.service';
import { Roles } from 'src/domain/user/e.user.role';

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
      console.log(error);
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
