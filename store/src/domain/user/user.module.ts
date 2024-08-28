import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { GradeEntity } from './entity/grade.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, Repository<UserEntity>, Repository<GradeEntity>],
})
export class UserModule {}
