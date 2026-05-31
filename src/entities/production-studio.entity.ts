import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('production_studio')
export class ProductionStudio extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
