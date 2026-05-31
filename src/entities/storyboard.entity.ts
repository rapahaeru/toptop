import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('storyboard')
export class Storyboard extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
