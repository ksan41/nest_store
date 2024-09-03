import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AppDataSource } from 'src/config/data.source';
import { plainToInstance } from 'class-transformer';
import { ViewUserDto } from '../dto/view.user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async getOneByUserId(userId: string) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async getAllUser(): Promise<ViewUserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(ViewUserDto, users, {
      excludeExtraneousValues: true,
    });
  }
}
