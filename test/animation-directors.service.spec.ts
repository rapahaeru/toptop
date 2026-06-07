import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimationDirector } from '../src/entities/animation-director.entity';
import { AnimationDirectorsService } from '../src/animation-directors/animation-directors.service';
import { CreateAnimationDirectorDto } from '../src/animation-directors/dto/create-animation-director.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeAnimationDirector = (overrides: Partial<AnimationDirector> = {}): AnimationDirector =>
  ({
    id: 1,
    name: 'Shingo Araki',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as AnimationDirector['createdBy'],
    updatedBy: { id: 1 } as AnimationDirector['updatedBy'],
    ...overrides,
  }) as AnimationDirector;

describe('AnimationDirectorsService', () => {
  let service: AnimationDirectorsService;
  let repo: Repository<AnimationDirector>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimationDirectorsService,
        { provide: getRepositoryToken(AnimationDirector), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AnimationDirectorsService>(AnimationDirectorsService);
    repo = module.get<Repository<AnimationDirector>>(getRepositoryToken(AnimationDirector));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return animation directors with default limit and offset', async () => {
      const mockData = [makeAnimationDirector()];
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
    it('should return an animation director by id', async () => {
      const mockData = makeAnimationDirector();
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
    const dto: CreateAnimationDirectorDto = { name: 'Shingo Araki' };

    it('should create and save with default userId 1', async () => {
      const built = makeAnimationDirector();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: dto.name, createdBy: { id: 1 }, updatedBy: { id: 1 } }),
      );
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeAnimationDirector({
        createdBy: { id: 2 } as AnimationDirector['createdBy'],
        updatedBy: { id: 2 } as AnimationDirector['updatedBy'],
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
