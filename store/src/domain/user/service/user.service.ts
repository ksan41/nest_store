import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AppDataSource } from 'src/config/data.source';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  getOne(userId: string) {
    return this.userRepository.findOneById(userId);
  }

  getAll() {
    return this.userRepository.find();
  }
}
