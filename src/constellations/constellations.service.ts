import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Constellation } from '../entities/constellation.entity';

@Injectable()
export class ConstellationsService {
  constructor(
    @InjectRepository(Constellation)
    private readonly repo: Repository<Constellation>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({ take: limit, skip: offset, order: { id: 'ASC' } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  searchByName(name: string, limit = 20) {
    return this.repo.find({
      where: { name: Like(`%${name}%`) },
      take: limit,
      order: { name: 'ASC' },
    });
  }
}
