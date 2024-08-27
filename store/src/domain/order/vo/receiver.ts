import { Column } from 'typeorm';

export class Receiver {
  @Column({ name: 'receiver_name' })
  name: string;

  @Column({ name: 'address_id' })
  addressId: number;

  @Column({ name: 'receiver_phone' })
  phone: string;
}
