import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderState } from './vo/e.order.state';
import { Receiver } from './vo/receiver';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ name: 'orderer_id' })
  ordererId: string;

  @Column(() => Receiver, { prefix: false })
  reciever: Receiver;

  @Column({ name: 'total_amounts' })
  totalAmounts: number;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'order_date' })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.BEFORE_PAYMENT,
  })
  state: OrderState;
}
