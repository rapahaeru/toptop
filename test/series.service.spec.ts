import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series, SeriesType } from '../src/entities/series.entity';
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

describe('SeriesService', () => {
  let service: SeriesService;
  let repo: Repository<Series>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        { provide: getRepositoryToken(Series), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
    repo = module.get<Repository<Series>>(getRepositoryToken(Series));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return series with default limit and offset and relations', async () => {
      const mockData = [makeSeries()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.list();

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 50,
        skip: 0,
        order: { name: 'ASC' },
        relations: ['director', 'genre', 'productionStudio', 'broadcaster', 'producer'],
      });
    });

    it('should respect custom limit and offset', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await service.list(10, 20);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10, skip: 20 }),
      );
    });
  });

  describe('findById', () => {
    it('should return a series by id with all relations including audit', async () => {
      const mockData = makeSeries();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await service.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['director', 'genre', 'productionStudio', 'broadcaster', 'producer', 'createdBy', 'updatedBy'],
      });
    });

    it('should return null when not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(await service.findById(999)).toBeNull();
    });
  });

  describe('create', () => {
    const baseDto: CreateSeriesDto = {
      name: 'Saint Seiya',
      releaseDate: '1986-10-11',
      directorId: 1,
      genreId: 2,
      productionStudioId: 3,
      broadcasterId: 4,
      producerId: 5,
    };

    it('should create and save with all required fields and default userId 1', async () => {
      const built = makeSeries();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(baseDto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: baseDto.name,
          director: { id: 1 },
          genre: { id: 2 },
          productionStudio: { id: 3 },
          broadcaster: { id: 4 },
          producer: { id: 5 },
          createdBy: { id: 1 },
          updatedBy: { id: 1 },
        }),
      );
      expect(mockRepository.save).toHaveBeenCalledWith(built);
      expect(result).toEqual(built);
    });

    it('should include releaseStartDate and releaseEndDate when provided', async () => {
      const dto: CreateSeriesDto = {
        ...baseDto,
        releaseStartDate: '1986-10-11',
        releaseEndDate: '1989-04-01',
      };
      const built = makeSeries();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          releaseStartDate: new Date('1986-10-11'),
          releaseEndDate: new Date('1989-04-01'),
        }),
      );
    });

    it('should set releaseStartDate and releaseEndDate to undefined when absent', async () => {
      const built = makeSeries({ releaseStartDate: undefined, releaseEndDate: undefined });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(baseDto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ releaseStartDate: undefined, releaseEndDate: undefined }),
      );
    });

    it('should include type when provided', async () => {
      const dto: CreateSeriesDto = { ...baseDto, type: 'OVA' };
      const built = makeSeries({ type: 'OVA' });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'OVA' }),
      );
    });

    it('should use the provided userId', async () => {
      const built = makeSeries({
        createdBy: { id: 7 } as Series['createdBy'],
        updatedBy: { id: 7 } as Series['updatedBy'],
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(baseDto, 7);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: { id: 7 }, updatedBy: { id: 7 } }),
      );
    });
  });
});
