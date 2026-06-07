import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../src/entities/producer.entity';
import { ProducersController } from '../src/producers/producers.controller';
import { ProducersService } from '../src/producers/producers.service';
import { CreateProducerDto } from '../src/producers/dto/create-producer.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeProducer = (overrides: Partial<Producer> = {}): Producer =>
  ({
    id: 1,
    name: 'Toei',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Producer['createdBy'],
    updatedBy: { id: 1 } as Producer['updatedBy'],
    ...overrides,
  }) as Producer;

describe('ProducersController', () => {
  let controller: ProducersController;
  let repo: Repository<Producer>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        ProducersService,
        { provide: getRepositoryToken(Producer), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    repo = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return producers with default limit and offset', async () => {
      const mockData = [makeProducer()];
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
    it('should return a producer by id', async () => {
      const mockData = makeProducer();
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
    it('should create and return a producer', async () => {
      const dto: CreateProducerDto = { name: 'Toei' };
      const built = makeProducer();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
