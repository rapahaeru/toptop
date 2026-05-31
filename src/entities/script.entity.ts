import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('script')
export class Script extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
