import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { DuplecatedException } from 'src/common/ custom.exceptions';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return this.userService.getOneByUserId(userId);
  }
}
