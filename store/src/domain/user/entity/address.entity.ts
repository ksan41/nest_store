import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  id: number;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  alias: string;

  @Column({
    name: 'is_default',
    type: 'boolean',
    default: false,
  })
  isDefault: boolean;

  @ManyToOne(() => UserEntity, user => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
