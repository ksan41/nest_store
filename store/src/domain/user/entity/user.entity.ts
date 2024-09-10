import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserInfo } from '../vo/user.info';
import { Address } from './address.entity';
import { GradeEntity } from './grade.entity';
import { UserRole } from '../e.user.role';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
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

  @Column({ name: 'order_count', default: 0 })
  orderCnt: number;

  @ManyToOne(() => GradeEntity)
  @JoinColumn({ name: 'grade_id' })
  grade: GradeEntity;

  @OneToMany(() => Address, address => address.user, { cascade: true })
  @JoinTable()
  addresses: Address[];
}
