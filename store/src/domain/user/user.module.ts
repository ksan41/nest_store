import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ShaEncryptionService } from 'src/common/util/sha-encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PermissionsEntity } from 'src/auth/entity/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PermissionsEntity])],
  controllers: [UserController],
  providers: [ShaEncryptionService, UserService, Base64StringService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
