import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series, SeriesType } from '../src/entities/series.entity';
import { SeriesController } from '../src/series/series.controller';
import { SeriesService } from '../src/series/series.service';
import { CreateSeriesDto } from '../src/series/dto/create-series.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeSeries = (overrides: Partial<Series> = {}): Series =>
  ({
    id: 1,
    name: 'Saint Seiya',
    releaseDate: new Date('1986-10-11'),
    releaseStartDate: new Date('1986-10-11'),
    releaseEndDate: new Date('1989-04-01'),
    type: 'TV' as SeriesType,
    director: { id: 1 } as Series['director'],
    genre: { id: 1 } as Series['genre'],
    productionStudio: { id: 1 } as Series['productionStudio'],
    broadcaster: { id: 1 } as Series['broadcaster'],
    producer: { id: 1 } as Series['producer'],
    createdBy: { id: 1 } as Series['createdBy'],
    updatedBy: { id: 1 } as Series['updatedBy'],
    createdTime: mockDate,
    updatedTime: mockDate,
    ...overrides,
  }) as Series;

describe('SeriesController', () => {
  let controller: SeriesController;
  let repo: Repository<Series>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesController],
      providers: [
        SeriesService,
        { provide: getRepositoryToken(Series), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<SeriesController>(SeriesController);
    repo = module.get<Repository<Series>>(getRepositoryToken(Series));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return series with default limit and offset', async () => {
      const mockData = [makeSeries()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 50, skip: 0 }),
      );
    });

    it('should pass limit and offset to service', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list('10', '20');

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10, skip: 20 }),
      );
    });
  });

  describe('findById', () => {
    it('should return a series by id', async () => {
      const mockData = makeSeries();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('should return null when not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(await controller.findById(999)).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a series', async () => {
      const dto: CreateSeriesDto = {
        name: 'Saint Seiya',
        releaseDate: '1986-10-11',
        directorId: 1,
        genreId: 2,
        productionStudioId: 3,
        broadcasterId: 4,
        producerId: 5,
      };
      const built = makeSeries();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
