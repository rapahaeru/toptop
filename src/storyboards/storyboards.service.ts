import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storyboard } from '../entities/storyboard.entity';
import { User } from '../entities/user.entity';
import { CreateStoryboardDto } from './dto/create-storyboard.dto';

@Injectable()
export class StoryboardsService {
  constructor(
    @InjectRepository(Storyboard)
    private readonly repo: Repository<Storyboard>,
  ) {}

  list(limit = 50, offset = 0) {
    const safeLimit = Math.min(limit, 100);
    return this.repo.find({
      take: safeLimit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateStoryboardDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
