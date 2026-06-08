import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  findOneWithRefreshToken(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, username: true, refreshToken: true, role: true },
    });
  }

  async createUser(dto: {
    name?: string;
    username: string;
    email?: string;
    password: string;
  }): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const entity = this.userRepository.create({ ...dto, password: hash });
    return this.userRepository.save(entity);
  }

  async updateRefreshToken(id: number, hash: string | null): Promise<void> {
    await this.userRepository.update(id, { refreshToken: hash });
  }
}
