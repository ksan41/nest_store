import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entity/user.entity';
import { UserInfo } from '../vo/user.info';
import { Address } from '../entity/address.entity';

export class CreateUserDto extends PartialType(UserEntity) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  info: UserInfo;

  @ApiProperty()
  gradeId: number;

  @ApiProperty()
  addresses: Address[];
}
