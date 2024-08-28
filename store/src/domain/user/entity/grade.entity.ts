import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'grade' })
export class GradeEntity {
  @PrimaryGeneratedColumn({
    name: 'grade_id',
  })
  private id: number;

  @Column({ name: 'grade_name' })
  private name: string;

  @Column({ name: 'purchase_count' })
  private purchaseCount: number;
  @Column({ name: 'rate_discount' })
  private rateDiscount: number;
}
