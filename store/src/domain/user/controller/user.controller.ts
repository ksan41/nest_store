import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { DuplecatedException, ExceptionMessage } from 'src/common/ custom.exceptions';
import { UpdateUserDto } from '../dto/update.user.dto';

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

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
