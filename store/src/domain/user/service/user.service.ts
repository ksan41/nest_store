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

  async getOneByUserId(userId: string): Promise<ViewUserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getAllUser(): Promise<ViewUserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(ViewUserDto, users, {
      excludeExtraneousValues: true,
    });
  }
}
