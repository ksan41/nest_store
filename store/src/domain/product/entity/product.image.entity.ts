import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_image' })
export class ProductImage {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  id: number;

  @ManyToOne(() => ProductEntity, product => product.images)
  product: ProductEntity;

  @Column({ name: 'save_path' })
  savePath: string;

  @Column({ name: 'save_name' })
  saveName: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column()
  ext: string;

  @Column()
  seq: number;

  @Column({ name: 'is_thumbnail' })
  isThumb: boolean;

  @CreateDateColumn({ name: 'upload_date' })
  uploadDate: Date;
}
