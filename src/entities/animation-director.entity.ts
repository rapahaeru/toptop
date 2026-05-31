import { Column, Entity } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';

@Entity('animation_director')
export class AnimationDirector extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;
}
