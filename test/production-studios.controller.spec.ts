import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionStudio } from '../src/entities/production-studio.entity';
import { ProductionStudiosController } from '../src/production-studios/production-studios.controller';
import { ProductionStudiosService } from '../src/production-studios/production-studios.service';
import { CreateProductionStudioDto } from '../src/production-studios/dto/create-production-studio.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeProductionStudio = (
  overrides: Partial<ProductionStudio> = {},
): ProductionStudio =>
  ({
    id: 1,
    name: 'Toei Animation',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as ProductionStudio['createdBy'],
    updatedBy: { id: 1 } as ProductionStudio['updatedBy'],
    ...overrides,
  }) as ProductionStudio;

describe('ProductionStudiosController', () => {
  let controller: ProductionStudiosController;
  let repo: Repository<ProductionStudio>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionStudiosController],
      providers: [
        ProductionStudiosService,
        {
          provide: getRepositoryToken(ProductionStudio),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ProductionStudiosController>(
      ProductionStudiosController,
    );
    repo = module.get<Repository<ProductionStudio>>(
      getRepositoryToken(ProductionStudio),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return studios with default limit and offset', async () => {
      const mockData = [makeProductionStudio()];
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
    it('should return a studio by id', async () => {
      const mockData = makeProductionStudio();
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
    it('should create and return a studio', async () => {
      const dto: CreateProductionStudioDto = { name: 'Toei Animation' };
      const built = makeProductionStudio();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
