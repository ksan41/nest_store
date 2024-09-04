import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { ShaEncryptionService } from './sha-encryption.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { AppDataSource } from 'src/config/data.source';
import { plainToInstance } from 'class-transformer';
import { ViewUserDto } from '../dto/view.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { DuplecatedException, ExceptionMessage } from 'src/common/ custom.exceptions';
import { TypeCheck } from 'src/common/util/type.check.service';

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
        newUser.info.password = this.passwordEncrypt(newUser.info.password);
        this.userRepository.save(newUser);
      } else {
        throw new DuplecatedException(ExceptionMessage.USER_DUPLICATED);
      }
    });
  }

  async modifyUserInfo(updateUserId: string, updateUser: UpdateUserDto) {
    await this.getOneByUserId(updateUserId).then(res => {
      if (TypeCheck.isEmpty(res)) {
        throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
      } else {
        if (!TypeCheck.isEmpty(updateUser.info.password)) {
          updateUser.info.password = this.passwordEncrypt(updateUser.info.password);
        }
        this.userRepository.update({ id: updateUserId }, { info: updateUser.info });
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

  private passwordEncrypt(plainPassword: string) {
    return this.encryptService.encrypt(plainPassword);
  }
}
