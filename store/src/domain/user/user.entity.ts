import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserInfo } from './vo/user.info';
import { UserState } from './vo/e.user.state';
import { Address } from './address.entity';
import { GradeEntity } from './grade.entity';
import { UserRole } from './vo/e.user.role';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ name: 'user_id', length: 10 })
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column(() => UserInfo, { prefix: false })
  info: UserInfo;

  @Column({ name: 'order_count' })
  orderCnt: number;

  @ManyToOne(() => GradeEntity)
  @JoinColumn({ name: 'grade_id' })
  grade: GradeEntity;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];
  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.ENABLE,
  })
  state: UserState;
}
