import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_line' })
export class OrderLine {
  @PrimaryGeneratedColumn({ name: 'order_line_id' })
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column()
  amounts: number;
}
