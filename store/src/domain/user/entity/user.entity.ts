import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserInfo } from '../vo/user.info';
import { UserState } from '../vo/e.user.state';
import { Address } from './address.entity';
import { GradeEntity } from './grade.entity';
import { UserRole } from '../vo/e.user.role';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ name: 'user_id', length: 10 })
  private id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  private role: UserRole;

  @Column(() => UserInfo, { prefix: false })
  private info: UserInfo;

  @Column({ name: 'order_count', default: 0 })
  private orderCnt: number;

  @ManyToOne(() => GradeEntity)
  @JoinColumn({ name: 'grade_id' })
  private grade: GradeEntity;

  @OneToMany(() => Address, address => address.user)
  private _addresses: Address[];

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.ENABLE,
  })
  private state: UserState;

  get addresses(): Address[] {
    return this._addresses;
  }
}
