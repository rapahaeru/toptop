import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimationDirector } from '../entities/animation-director.entity';
import { User } from '../entities/user.entity';
import { CreateAnimationDirectorDto } from './dto/create-animation-director.dto';

@Injectable()
export class AnimationDirectorsService {
  constructor(
    @InjectRepository(AnimationDirector)
    private readonly repo: Repository<AnimationDirector>,
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

  create(dto: CreateAnimationDirectorDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
