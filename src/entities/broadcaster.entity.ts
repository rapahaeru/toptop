import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('broadcaster')
export class Broadcaster extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
