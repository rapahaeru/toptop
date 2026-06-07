import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from '../entities/director.entity';
import { User } from '../entities/user.entity';
import { CreateDirectorDto } from './dto/create-director.dto';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly repo: Repository<Director>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateDirectorDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
