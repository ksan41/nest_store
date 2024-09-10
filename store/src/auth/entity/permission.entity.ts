import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEnum } from '../e.permission.enum';
import { UserRole } from 'src/domain/user/e.user.role';

@Entity('permissions')
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  kind: string;

  @Column({
    type: 'enum',
    enum: PermissionEnum,
  })
  crud: PermissionEnum;
}
