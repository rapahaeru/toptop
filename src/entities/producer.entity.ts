import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('producer')
export class Producer extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
