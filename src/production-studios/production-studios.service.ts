import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionStudio } from '../entities/production-studio.entity';
import { User } from '../entities/user.entity';
import { CreateProductionStudioDto } from './dto/create-production-studio.dto';

@Injectable()
export class ProductionStudiosService {
  constructor(
    @InjectRepository(ProductionStudio)
    private readonly repo: Repository<ProductionStudio>,
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

  create(dto: CreateProductionStudioDto, userId = 1) {
    const user = { id: userId } as User;
    const entity = this.repo.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    return this.repo.save(entity);
  }
}
