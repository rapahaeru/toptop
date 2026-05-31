import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('genre')
export class Genre extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
