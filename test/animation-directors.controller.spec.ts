import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimationDirector } from '../src/entities/animation-director.entity';
import { AnimationDirectorsController } from '../src/animation-directors/animation-directors.controller';
import { AnimationDirectorsService } from '../src/animation-directors/animation-directors.service';
import { CreateAnimationDirectorDto } from '../src/animation-directors/dto/create-animation-director.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeAnimationDirector = (
  overrides: Partial<AnimationDirector> = {},
): AnimationDirector =>
  ({
    id: 1,
    name: 'Shingo Araki',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as AnimationDirector['createdBy'],
    updatedBy: { id: 1 } as AnimationDirector['updatedBy'],
    ...overrides,
  }) as AnimationDirector;

describe('AnimationDirectorsController', () => {
  let controller: AnimationDirectorsController;
  let repo: Repository<AnimationDirector>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimationDirectorsController],
      providers: [
        AnimationDirectorsService,
        {
          provide: getRepositoryToken(AnimationDirector),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<AnimationDirectorsController>(
      AnimationDirectorsController,
    );
    repo = module.get<Repository<AnimationDirector>>(
      getRepositoryToken(AnimationDirector),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return animation directors with default limit and offset', async () => {
      const mockData = [makeAnimationDirector()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 50,
        skip: 0,
        order: { name: 'ASC' },
      });
    });

    it('should pass limit and offset to service', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list('5', '10');

      expect(mockRepository.find).toHaveBeenCalledWith({
        take: 5,
        skip: 10,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findById', () => {
    it('should return an animation director by id', async () => {
      const mockData = makeAnimationDirector();
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
    it('should create and return an animation director', async () => {
      const dto: CreateAnimationDirectorDto = { name: 'Shingo Araki' };
      const built = makeAnimationDirector();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto, 1);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
