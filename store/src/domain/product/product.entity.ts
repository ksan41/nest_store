import { Column, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductState } from './vo/e.product.state';
import { ProductImage } from './product.image.entity';
import { ProductInfo } from './vo/product.info';
import { Category } from './category.entity';

export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column(() => ProductInfo, { prefix: false })
  info: ProductInfo;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({
    type: 'enum',
    enum: ProductState,
    default: ProductState.ON_SALE,
  })
  state: ProductState;

  @OneToMany(() => ProductImage, image => image.product)
  images: ProductImage[];
}
