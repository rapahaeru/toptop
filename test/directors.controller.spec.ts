import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from '../src/entities/director.entity';
import { DirectorsController } from '../src/directors/directors.controller';
import { DirectorsService } from '../src/directors/directors.service';
import { CreateDirectorDto } from '../src/directors/dto/create-director.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeDirector = (overrides: Partial<Director> = {}): Director =>
  ({
    id: 1,
    name: 'Kōzō Morishita',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Director['createdBy'],
    updatedBy: { id: 1 } as Director['updatedBy'],
    ...overrides,
  }) as Director;

describe('DirectorsController', () => {
  let controller: DirectorsController;
  let repo: Repository<Director>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorsController],
      providers: [
        DirectorsService,
        { provide: getRepositoryToken(Director), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<DirectorsController>(DirectorsController);
    repo = module.get<Repository<Director>>(getRepositoryToken(Director));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return directors with default limit and offset', async () => {
      const mockData = [makeDirector()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({ take: 50, skip: 0, order: { name: 'ASC' } });
    });

    it('should pass limit and offset to service', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list('10', '20');

      expect(mockRepository.find).toHaveBeenCalledWith({ take: 10, skip: 20, order: { name: 'ASC' } });
    });
  });

  describe('findById', () => {
    it('should return a director by id', async () => {
      const mockData = makeDirector();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null when not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(await controller.findById(999)).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a director', async () => {
      const dto: CreateDirectorDto = { name: 'Kōzō Morishita' };
      const built = makeDirector();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
