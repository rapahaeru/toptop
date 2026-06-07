import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/entities/user.entity';
import { UsersController } from '../src/users/users.controller';
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

describe('UsersController', () => {
  let controller: UsersController;
  let repo: Repository<User>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockData = [makeUser(), makeUser({ id: 2, username: 'other' })];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.findAll();

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array when there are no users', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockData = makeUser();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
