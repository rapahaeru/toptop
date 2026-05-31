import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseAuditableEntity } from './base/base-auditable.entity';
import { Broadcaster } from './broadcaster.entity';
import { Director } from './director.entity';
import { Genre } from './genre.entity';
import { Producer } from './producer.entity';
import { ProductionStudio } from './production-studio.entity';

export type SeriesType = 'TV' | 'OVA' | 'ONA' | 'MOVIE';

@Entity('series')
@Unique(['name'])
export class Series extends BaseAuditableEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'release_date', type: 'datetime' })
  releaseDate!: Date;

  @Column({ name: 'release_start_date', type: 'datetime', nullable: true })
  releaseStartDate?: Date;

  @Column({ name: 'release_end_date', type: 'datetime', nullable: true })
  releaseEndDate?: Date;

  @Column({
    type: 'enum',
    enum: ['TV', 'OVA', 'ONA', 'MOVIE'],
    default: 'TV',
    nullable: true,
  })
  type?: SeriesType;

  @ManyToOne(() => Director)
  @JoinColumn({ name: 'director_id' })
  director!: Director;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  genre!: Genre;

  @ManyToOne(() => ProductionStudio)
  @JoinColumn({ name: 'production_studio_id' })
  productionStudio!: ProductionStudio;

  @ManyToOne(() => Broadcaster)
  @JoinColumn({ name: 'broadcaster_id' })
  broadcaster!: Broadcaster;

  @ManyToOne(() => Producer)
  @JoinColumn({ name: 'producer_id' })
  producer!: Producer;
}
