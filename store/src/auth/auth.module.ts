import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { ShaEncryptionService } from 'src/common/util/sha-encryption.service';
import { UserService } from 'src/domain/user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PermissionsEntity } from './entity/permission.entity';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { AuthService } from './auth.service';
import { GradeEntity } from 'src/domain/user/entity/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity, UserEntity, GradeEntity])],
  providers: [Base64StringService, ShaEncryptionService, UserService, JwtService, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
