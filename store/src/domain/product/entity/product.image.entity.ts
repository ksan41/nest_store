import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_image' })
export class ProductImage {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  id: number;

  @ManyToOne(() => ProductEntity, product => product.images)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity;

  @Column({ name: 'save_path' })
  savePath: string;

  @Column({ name: 'save_name' })
  saveName: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ default: 0 })
  size: number;

  @Column()
  ext: string;

  @Column({ default: 0 })
  seq: number;

  @Column({ name: 'is_thumbnail', default: false })
  isThumb: boolean;

  @CreateDateColumn({ name: 'upload_date' })
  uploadDate: Date;
}
