import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../src/entities/producer.entity';
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

describe('ProducersService', () => {
  let service: ProducersService;
  let repo: Repository<Producer>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        { provide: getRepositoryToken(Producer), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    repo = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return producers with default limit and offset', async () => {
      const mockData = [makeProducer()];
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
    it('should return a producer by id', async () => {
      const mockData = makeProducer();
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
    const dto: CreateProducerDto = { name: 'Toei' };

    it('should create and save with default userId 1', async () => {
      const built = makeProducer();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: dto.name, createdBy: { id: 1 }, updatedBy: { id: 1 } }),
      );
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeProducer({
        createdBy: { id: 4 } as Producer['createdBy'],
        updatedBy: { id: 4 } as Producer['updatedBy'],
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto, 4);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: { id: 4 }, updatedBy: { id: 4 } }),
      );
    });
  });
});
