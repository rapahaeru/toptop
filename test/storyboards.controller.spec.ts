import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storyboard } from '../src/entities/storyboard.entity';
import { StoryboardsController } from '../src/storyboards/storyboards.controller';
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

describe('StoryboardsController', () => {
  let controller: StoryboardsController;
  let repo: Repository<Storyboard>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryboardsController],
      providers: [
        StoryboardsService,
        { provide: getRepositoryToken(Storyboard), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<StoryboardsController>(StoryboardsController);
    repo = module.get<Repository<Storyboard>>(getRepositoryToken(Storyboard));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return storyboards with default limit and offset', async () => {
      const mockData = [makeStoryboard()];
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
    it('should return a storyboard by id', async () => {
      const mockData = makeStoryboard();
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
    it('should create and return a storyboard', async () => {
      const dto: CreateStoryboardDto = { name: 'Kōzō Morishita' };
      const built = makeStoryboard();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
