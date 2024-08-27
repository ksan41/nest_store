import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'grade' })
export class GradeEntity {
  @PrimaryGeneratedColumn({
    name: 'grade_id',
  })
  id: number;

  @Column({ name: 'grade_name' })
  name: string;
  @Column({ name: 'purchase_count' })
  purchaseCount: number;
  @Column({ name: 'rate_discount' })
  rateDiscount: number;
}
