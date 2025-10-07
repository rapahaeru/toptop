import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export type ConstellationType =
  | 'ZODIAC'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'OTHER';

@Entity('constellations')
@Unique(['name'])
export class Constellation {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['ZODIAC', 'BRONZE', 'SILVER', 'GOLD', 'OTHER'],
    default: 'OTHER',
  })
  type!: ConstellationType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
