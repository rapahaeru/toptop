import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';
import { AnimationDirector } from './animation-director.entity';
import { Script } from './script.entity';
import { Series } from './series.entity';
import { Storyboard } from './storyboard.entity';

@Entity('episode')
export class Episode extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ name: 'broadcasted_date', type: 'datetime', nullable: true })
  broadcastedDate?: Date;

  @ManyToOne(() => Series)
  @JoinColumn({ name: 'series_id' })
  series!: Series;

  @ManyToOne(() => AnimationDirector)
  @JoinColumn({ name: 'animation_director_id' })
  animationDirector!: AnimationDirector;

  @ManyToOne(() => Script)
  @JoinColumn({ name: 'script_id' })
  script!: Script;

  @ManyToOne(() => Storyboard)
  @JoinColumn({ name: 'storyboard_id' })
  storyboard!: Storyboard;
}
