import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Script } from '../entities/script.entity';
import { User } from '../entities/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';

@Injectable()
export class ScriptsService {
  constructor(
    @InjectRepository(Script)
    private readonly repo: Repository<Script>,
  ) {}

  list(limit = 50, offset = 0) {
    return this.repo.find({ take: limit, skip: offset, order: { name: 'ASC' } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateScriptDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({ ...dto, createdBy: user, updatedBy: user });
    return this.repo.save(entity);
  }
}
