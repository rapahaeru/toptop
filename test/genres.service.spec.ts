import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../src/entities/genre.entity';
import { GenresService } from '../src/genres/genres.service';
import { CreateGenreDto } from '../src/genres/dto/create-genre.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeGenre = (overrides: Partial<Genre> = {}): Genre =>
  ({
    id: 1,
    name: 'Ação / Aventura / Fantasia',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Genre['createdBy'],
    updatedBy: { id: 1 } as Genre['updatedBy'],
    ...overrides,
  }) as Genre;

describe('GenresService', () => {
  let service: GenresService;
  let repo: Repository<Genre>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        { provide: getRepositoryToken(Genre), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
    repo = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return genres with default limit and offset', async () => {
      const mockData = [makeGenre(), makeGenre({ id: 2, name: 'Drama' })];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.list();

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({ take: 50, skip: 0, order: { name: 'ASC' } });
    });

    it('should respect custom limit and offset', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await service.list(5, 10);

      expect(mockRepository.find).toHaveBeenCalledWith({ take: 5, skip: 10, order: { name: 'ASC' } });
    });
  });

  describe('findById', () => {
    it('should return a genre by id', async () => {
      const mockData = makeGenre();
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
    const dto: CreateGenreDto = { name: 'Ação / Aventura / Fantasia' };

    it('should create and save with default userId 1', async () => {
      const built = makeGenre();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: dto.name, createdBy: { id: 1 }, updatedBy: { id: 1 } }),
      );
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeGenre({
        createdBy: { id: 3 } as Genre['createdBy'],
        updatedBy: { id: 3 } as Genre['updatedBy'],
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto, 3);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: { id: 3 }, updatedBy: { id: 3 } }),
      );
    });
  });
});
