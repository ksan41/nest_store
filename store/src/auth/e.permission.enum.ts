import { Reflector } from '@nestjs/core';

export enum PermissionEnum {
  C = 'create',
  R = 'read',
  U = 'update',
  D = 'delete',
}

export const Permission = Reflector.createDecorator<string[]>();
