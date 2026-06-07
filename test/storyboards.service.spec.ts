import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storyboard } from '../src/entities/storyboard.entity';
import { StoryboardsService } from '../src/storyboards/storyboards.service';
import { CreateStoryboardDto } from '../src/storyboards/dto/create-storyboard.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeStoryboard = (overrides: Partial<Storyboard> = {}): Storyboard =>
  ({
    id: 1,
    name: 'Kōzō Morishita',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Storyboard['createdBy'],
    updatedBy: { id: 1 } as Storyboard['updatedBy'],
    ...overrides,
  }) as Storyboard;

describe('StoryboardsService', () => {
  let service: StoryboardsService;
  let repo: Repository<Storyboard>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoryboardsService,
        { provide: getRepositoryToken(Storyboard), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<StoryboardsService>(StoryboardsService);
    repo = module.get<Repository<Storyboard>>(getRepositoryToken(Storyboard));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return storyboards with default limit and offset', async () => {
      const mockData = [makeStoryboard()];
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

      await service.list(5, 10);

      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 5,
        skip: 10,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findById', () => {
    it('should return a storyboard by id', async () => {
      const mockData = makeStoryboard();
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
    const dto: CreateStoryboardDto = { name: 'Kōzō Morishita' };

    it('should create and save with default userId 1', async () => {
      const built = makeStoryboard();
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
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeStoryboard({
        createdBy: { id: 2 } as Storyboard['createdBy'],
        updatedBy: { id: 2 } as Storyboard['updatedBy'],
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto, 2);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: { id: 2 }, updatedBy: { id: 2 } }),
      );
    });
  });
});
