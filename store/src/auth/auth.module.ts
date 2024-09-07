import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ShaEncryptionService } from 'src/common/util/sha-encryption.service';
import { UserService } from 'src/domain/user/service/user.service';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  providers: [AuthService, Base64StringService, JwtService, ShaEncryptionService, UserService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
