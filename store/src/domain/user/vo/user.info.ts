import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class UserInfo {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @UpdateDateColumn({ name: 'modified_date' })
  modifiedDate: Date;

  @CreateDateColumn({ name: 'join_date' })
  joinDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;
}
