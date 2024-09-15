import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column({ name: 'parent_id', default: 0 })
  parentId: number;

  @Column({ name: 'category_name' })
  name: string;

  @Column()
  level: number;

  @ManyToMany(() => ProductEntity, product => product.categories)
  products: ProductEntity[];
}
