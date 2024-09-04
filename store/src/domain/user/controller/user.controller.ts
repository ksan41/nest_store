import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create.user.dto';

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

  @Delete(':id')
  remove(@Param('id') removeUserId: string) {
    return this.userService.removeUser(removeUserId);
  }
}
