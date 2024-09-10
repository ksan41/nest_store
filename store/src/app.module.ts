import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './database/data.source';
import { ConfigModule } from '@nestjs/config';
import config from 'config/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/guards/role.guard';
import { Reflector } from '@nestjs/core';
import { PermissionGuard } from './auth/guards/permission.guard';
import { JwtService } from '@nestjs/jwt';
import { PermissionsEntity } from './auth/entity/permission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([PermissionsEntity]),
    UserModule,
    CommonModule,
    AuthModule,
  ],
  providers: [
    JwtService,
    AuthService,
    {
      provide: RoleGuard,
      inject: [Reflector, AuthService],
      useFactory: (reflector: Reflector, authService: AuthService) => {
        return new RoleGuard(reflector, authService);
      },
    },
    {
      provide: PermissionGuard,
      inject: [Reflector, AuthService],
      useFactory: (reflector: Reflector, authService: AuthService) => {
        return new PermissionGuard(reflector, authService);
      },
    },
  ],
  exports: [],
})
export class AppModule {}
