import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { ShaEncryptionService } from './sha-encryption.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { AppDataSource } from 'src/config/data.source';
import { plainToInstance } from 'class-transformer';
import { ViewUserDto } from '../dto/view.user.dto';
import { DuplecatedException, ExceptionMessage } from 'src/common/ custom.exceptions';

@Injectable()
export class UserService {
  constructor(
    private userRepository: Repository<UserEntity>,
    private encryptService: ShaEncryptionService,
  ) {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async createUser(newUser: CreateUserDto) {
    return await this.isDuplicate(newUser.id).then(res => {
      if (!res) {
        const encryptPw = this.encryptService.encrypt(newUser.info.password);
        newUser.info.password = encryptPw;
        this.userRepository.save(newUser);
      } else {
        throw new DuplecatedException(ExceptionMessage.USER_DUPLICATED);
      }
    });
  }

  async removeUser(removeUserId: string) {
    await this.userRepository.softDelete({ id: removeUserId });
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

  async isDuplicate(userId: string): Promise<boolean> {
    return await this.userRepository.existsBy({ id: userId }).then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  }
}
