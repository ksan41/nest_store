import { Reflector } from '@nestjs/core';

export enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export const Roles = Reflector.createDecorator<string[]>();
