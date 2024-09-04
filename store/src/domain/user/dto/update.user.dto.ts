import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserInfo } from '../vo/user.info';
import { Expose } from 'class-transformer';

export class UpdateUserInfoDto extends OmitType(UserInfo, ['deletedDate', 'joinDate', 'modifiedDate'] as const) {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @Expose()
  info: UpdateUserInfoDto;
}
