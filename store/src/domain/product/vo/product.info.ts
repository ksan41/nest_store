import { Column } from 'typeorm';

export class ProductInfo {
  @Column({ name: 'product_name' })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ name: 'expiration_date', nullable: true })
  expirationDate: Date;

  @Column()
  quantity: number;
}
