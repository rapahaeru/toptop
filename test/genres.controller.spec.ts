import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../src/entities/genre.entity';
import { GenresController } from '../src/genres/genres.controller';
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

describe('GenresController', () => {
  let controller: GenresController;
  let repo: Repository<Genre>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        GenresService,
        { provide: getRepositoryToken(Genre), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
    repo = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return genres with default limit and offset', async () => {
      const mockData = [makeGenre()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({ take: 50, skip: 0, order: { name: 'ASC' } });
    });

    it('should pass limit and offset to service', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list('5', '10');

      expect(mockRepository.find).toHaveBeenCalledWith({ take: 5, skip: 10, order: { name: 'ASC' } });
    });
  });

  describe('findById', () => {
    it('should return a genre by id', async () => {
      const mockData = makeGenre();
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
    it('should create and return a genre', async () => {
      const dto: CreateGenreDto = { name: 'Ação / Aventura / Fantasia' };
      const built = makeGenre();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
