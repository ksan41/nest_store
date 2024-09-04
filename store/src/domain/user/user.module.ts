import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ShaEncryptionService } from './service/sha-encryption.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, ShaEncryptionService, Repository<UserEntity>],
})
export class UserModule {}
