import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { ShaEncryptionService } from '../../../common/util/sha-encryption.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { plainToInstance } from 'class-transformer';
import { ViewUserDto } from '../dto/view.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { DuplecatedException, ExceptionMessage } from 'src/common/ custom.exceptions';
import { TypeCheck } from 'src/common/util/type.check.service';
import { Base64StringService } from 'src/common/util/base64.string.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeEntity } from '../entity/grade.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GradeEntity) private readonly gradeRepository: Repository<GradeEntity>,
    private readonly encryptService: ShaEncryptionService,
    private readonly base64Service: Base64StringService,
  ) {}

  async createUser(newUser: CreateUserDto) {
    return await this.isDuplicate(newUser.id).then(res => {
      if (!res) {
        const plainPassword = this.base64Service.decode(newUser.info.password);
        newUser.info.password = this.passwordEncrypt(plainPassword);
        this.gradeRepository.findOne({ where: { id: newUser.gradeId } }).then(grade => {
          newUser.grade = grade;
        });
        this.userRepository.save(newUser);
      } else {
        throw new DuplecatedException(ExceptionMessage.USER_DUPLICATED);
      }
    });
  }

  async modifyUserInfo(updateUserId: string, updateUser: UpdateUserDto) {
    await this.getOneUser(updateUserId).then(res => {
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

  async getOneUser(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
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
