import { Test, TestingModule } from '@nestjs/testing';
import { ConstellationsService } from '../src/constellations/constellations.service';
import { Repository } from 'typeorm';
import { Constellation } from '../src/entities/constellation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConstellationType } from '../src/entities/constellation.entity';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('ConstellationsService', () => {
  let service: ConstellationsService;
  let repo: Repository<Constellation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstellationsService,
        {
          provide: getRepositoryToken(Constellation),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConstellationsService>(ConstellationsService);
    repo = module.get<Repository<Constellation>>(
      getRepositoryToken(Constellation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of constellations', async () => {
    const mockData: Constellation[] = [
      {
        id: 1,
        name: 'Aries',
        type: 'ZODIAC' as ConstellationType,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Taurus',
        type: 'ZODIAC' as ConstellationType,
        createdAt: new Date(),
      },
    ];
    jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

    const result = await service.list(2, 0);
    expect(result).toEqual(mockData);
    expect(mockRepository.find).toHaveBeenCalledWith({
      take: 2,
      skip: 0,
      order: { id: 'ASC' },
    });
  });

  it('should return a constellation by ID', async () => {
    const mockData = {
      id: 1,
      name: 'Aries',
      type: 'ZODIAC' as ConstellationType,
      createdAt: new Date(),
    } as Constellation;
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

    const result = await service.findById(1);
    expect(result).toEqual(mockData);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should search constellations by name', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Aries',
        type: 'ZODIAC' as ConstellationType,
        createdAt: new Date(),
      } as Constellation,
    ];
    jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

    const result = await service.searchByName('Aries', 1);
    expect(result).toEqual(mockData);
    // console.log(mockRepository.find);
    // expect(mockRepository.find).toHaveBeenCalledWith({ take: 1 });
  });
});
