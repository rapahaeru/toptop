import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { User } from '../entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly repo: Repository<Genre>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({ take: limit, skip: offset, order: { name: 'ASC' } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateGenreDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({ ...dto, createdBy: user, updatedBy: user });
    return this.repo.save(entity);
  }
}
