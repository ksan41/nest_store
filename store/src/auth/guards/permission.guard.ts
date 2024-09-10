import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { TypeCheck } from 'src/common/util/type.check.service';
import { Permission } from '../e.permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get(Permission, context.getHandler());
    const request = context.switchToHttp().getRequest();

    const token = this.authService.extractTokenFromHeader(request);
    const payload = await this.authService.getPayload(token);
    const loadPermission = this.authService.findPermission(payload.role, permission[0], permission[1]);
    if (TypeCheck.isEmpty(loadPermission)) return false;
    else return true;
  }
}
