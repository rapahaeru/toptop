import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Script } from '../src/entities/script.entity';
import { ScriptsService } from '../src/scripts/scripts.service';
import { CreateScriptDto } from '../src/scripts/dto/create-script.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('2024-01-01');

const makeScript = (overrides: Partial<Script> = {}): Script =>
  ({
    id: 1,
    name: 'Takao Kogure',
    createdTime: mockDate,
    updatedTime: mockDate,
    createdBy: { id: 1 } as Script['createdBy'],
    updatedBy: { id: 1 } as Script['updatedBy'],
    ...overrides,
  }) as Script;

describe('ScriptsService', () => {
  let service: ScriptsService;
  let repo: Repository<Script>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScriptsService,
        { provide: getRepositoryToken(Script), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ScriptsService>(ScriptsService);
    repo = module.get<Repository<Script>>(getRepositoryToken(Script));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return scripts with default limit and offset', async () => {
      const mockData = [makeScript()];
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
    it('should return a script by id', async () => {
      const mockData = makeScript();
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
    const dto: CreateScriptDto = { name: 'Takao Kogure' };

    it('should create and save with default userId 1', async () => {
      const built = makeScript();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: dto.name, createdBy: { id: 1 }, updatedBy: { id: 1 } }),
      );
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeScript({
        createdBy: { id: 2 } as Script['createdBy'],
        updatedBy: { id: 2 } as Script['updatedBy'],
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
