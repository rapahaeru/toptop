import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broadcaster } from '../entities/broadcaster.entity';
import { User } from '../entities/user.entity';
import { CreateBroadcasterDto } from './dto/create-broadcaster.dto';

@Injectable()
export class BroadcastersService {
  constructor(
    @InjectRepository(Broadcaster)
    private readonly repo: Repository<Broadcaster>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({ take: limit, skip: offset, order: { name: 'ASC' } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateBroadcasterDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({ ...dto, createdBy: user, updatedBy: user });
    return this.repo.save(entity);
  }
}
