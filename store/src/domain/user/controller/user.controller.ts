import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { Roles, UserRole } from '../e.user.role';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Permission, PermissionEnum } from 'src/auth/e.permission.enum';
import { domainConstants } from 'src/common/constants/constants';
import { PermissionGuard } from 'src/auth/guards/permission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @Roles([UserRole.MANAGER])
  @Permission([domainConstants.user, PermissionEnum.R])
  @UseGuards(RoleGuard, PermissionGuard)
  getOne(@Param('id') userId: string) {
    return this.userService.getOneUser(userId);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  modifyUserInfo(@Param('id') updateUserId: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.modifyUserInfo(updateUserId, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') removeUserId: string) {
    return this.userService.removeUser(removeUserId);
  }
}
