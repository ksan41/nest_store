import { Expose, Type } from 'class-transformer';
import { UserState } from '../vo/e.user.state';
import { OmitType } from '@nestjs/swagger';
import { UserInfo } from '../vo/user.info';

export class ViewUserInfoDto extends OmitType(UserInfo, [
  'password',
  'modifiedDate',
  'joinDate',
  'deletedDate' as const,
]) {
  @Expose()
  userName: string;
  @Expose()
  nickName: string;
  @Expose()
  email: string;
}

export class ViewUserDto {
  @Expose()
  id: string;

  @Expose()
  @Type()
  info: ViewUserInfoDto;

  @Expose()
  state: UserState;
}
