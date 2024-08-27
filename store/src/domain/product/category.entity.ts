import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @OneToOne(() => Category)
  parent: Category;

  @Column({ name: 'category_name' })
  name: string;

  @Column()
  level: number;
}
