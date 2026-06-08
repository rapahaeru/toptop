import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { User } from '../entities/user.entity';
import { CreateProducerDto } from './dto/create-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
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

  create(dto: CreateProducerDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
