import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryType } from './vo/e.history.type';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: HistoryType,
    name: 'history_type',
  })
  type: HistoryType;

  @Column({ name: 'access_ip' })
  accessIp: string;

  @CreateDateColumn({ name: 'reg_date' })
  regDate: Date;
}
