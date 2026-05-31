import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('director')
export class Director extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
