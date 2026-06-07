import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from '../src/entities/director.entity';
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

describe('DirectorsService', () => {
  let service: DirectorsService;
  let repo: Repository<Director>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorsService,
        { provide: getRepositoryToken(Director), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<DirectorsService>(DirectorsService);
    repo = module.get<Repository<Director>>(getRepositoryToken(Director));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return directors with default limit and offset', async () => {
      const mockData = [makeDirector(), makeDirector({ id: 2, name: 'Outro' })];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.list();

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 50,
        skip: 0,
        order: { name: 'ASC' },
      });
    });

    it('should respect custom limit and offset', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await service.list(10, 20);

      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 20,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findById', () => {
    it('should return a director by id', async () => {
      const mockData = makeDirector();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await service.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null when not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(await service.findById(999)).toBeNull();
    });
  });

  describe('create', () => {
    const dto: CreateDirectorDto = { name: 'Kōzō Morishita' };

    it('should create and save with default userId 1', async () => {
      const built = makeDirector();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: dto.name,
          createdBy: { id: 1 },
          updatedBy: { id: 1 },
        }),
      );
      expect(mockRepository.save).toHaveBeenCalledWith(built);
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeDirector({
        createdBy: { id: 5 } as Director['createdBy'],
        updatedBy: { id: 5 } as Director['updatedBy'],
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto, 5);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: { id: 5 }, updatedBy: { id: 5 } }),
      );
    });
  });
});
