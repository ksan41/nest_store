import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  private id: number;

  @Column()
  private address1: string;

  @Column()
  private address2: string;

  @Column({ name: 'zip_code' })
  private zipCode: string;

  @Column()
  private alias: string;

  @Column({
    name: 'is_default',
    type: 'boolean',
    default: false,
  })
  private isDefault: boolean;

  @ManyToOne(() => UserEntity, user => user.addresses)
  private _user: UserEntity;

  get user(): UserEntity {
    return this._user;
  }
}
