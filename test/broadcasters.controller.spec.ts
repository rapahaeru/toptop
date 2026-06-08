import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broadcaster } from '../src/entities/broadcaster.entity';
import { BroadcastersController } from '../src/broadcasters/broadcasters.controller';
import { BroadcastersService } from '../src/broadcasters/broadcasters.service';
import { CreateBroadcasterDto } from '../src/broadcasters/dto/create-broadcaster.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeBroadcaster = (overrides: Partial<Broadcaster> = {}): Broadcaster =>
  ({
    id: 1,
    name: 'TV Asahi',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Broadcaster['createdBy'],
    updatedBy: { id: 1 } as Broadcaster['updatedBy'],
    ...overrides,
  }) as Broadcaster;

describe('BroadcastersController', () => {
  let controller: BroadcastersController;
  let repo: Repository<Broadcaster>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BroadcastersController],
      providers: [
        BroadcastersService,
        { provide: getRepositoryToken(Broadcaster), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<BroadcastersController>(BroadcastersController);
    repo = module.get<Repository<Broadcaster>>(getRepositoryToken(Broadcaster));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return broadcasters with default limit and offset', async () => {
      const mockData = [makeBroadcaster()];
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
    it('should return a broadcaster by id', async () => {
      const mockData = makeBroadcaster();
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
    it('should create and return a broadcaster', async () => {
      const dto: CreateBroadcasterDto = { name: 'TV Asahi' };
      const built = makeBroadcaster();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto, 1);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
