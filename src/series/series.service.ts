import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimationDirector } from '../entities/animation-director.entity';
import { Broadcaster } from '../entities/broadcaster.entity';
import { Director } from '../entities/director.entity';
import { Genre } from '../entities/genre.entity';
import { Producer } from '../entities/producer.entity';
import { ProductionStudio } from '../entities/production-studio.entity';
import { Series } from '../entities/series.entity';
import { User } from '../entities/user.entity';
import { CreateSeriesDto } from './dto/create-series.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly repo: Repository<Series>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
      relations: ['director', 'genre', 'productionStudio', 'broadcaster', 'producer'],
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['director', 'genre', 'productionStudio', 'broadcaster', 'producer', 'createdBy', 'updatedBy'],
    });
  }

  create(dto: CreateSeriesDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      name: dto.name,
      releaseDate: new Date(dto.releaseDate),
      releaseStartDate: dto.releaseStartDate ? new Date(dto.releaseStartDate) : undefined,
      releaseEndDate: dto.releaseEndDate ? new Date(dto.releaseEndDate) : undefined,
      type: dto.type,
      director: { id: dto.directorId } as Director,
      genre: { id: dto.genreId } as Genre,
      productionStudio: { id: dto.productionStudioId } as ProductionStudio,
      broadcaster: { id: dto.broadcasterId } as Broadcaster,
      producer: { id: dto.producerId } as Producer,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
