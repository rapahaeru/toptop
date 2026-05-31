import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimationDirector } from '../entities/animation-director.entity';
import { Episode } from '../entities/episode.entity';
import { Script } from '../entities/script.entity';
import { Series } from '../entities/series.entity';
import { Storyboard } from '../entities/storyboard.entity';
import { User } from '../entities/user.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly repo: Repository<Episode>,
  ) {}

  list(limit = 50, offset = 0, seriesId?: number) {
    return this.repo.find({
      where: seriesId ? { series: { id: seriesId } } : {},
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
      relations: ['series', 'animationDirector', 'script', 'storyboard'],
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['series', 'animationDirector', 'script', 'storyboard', 'createdBy', 'updatedBy'],
    });
  }

  create(dto: CreateEpisodeDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      title: dto.title,
      broadcastedDate: dto.broadcastedDate ? new Date(dto.broadcastedDate) : undefined,
      series: { id: dto.seriesId } as Series,
      animationDirector: { id: dto.animationDirectorId } as AnimationDirector,
      script: { id: dto.scriptId } as Script,
      storyboard: { id: dto.storyboardId } as Storyboard,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
