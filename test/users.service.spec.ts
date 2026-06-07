import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/entities/user.entity';
import { UsersService } from '../src/users/users.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    id: 1,
    name: 'Admin',
    username: 'admin',
    email: 'admin@example.com',
    password: 'hashed',
    createdTime: mockDate,
    updatedTime: mockDate,
    ...overrides,
  }) as User;

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockData = [makeUser(), makeUser({ id: 2, username: 'other' })];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.findAll();

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array when there are no users', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockData = makeUser();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await service.findOne(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null when user is not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });
});
