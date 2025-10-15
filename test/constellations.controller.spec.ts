import { Test, TestingModule } from '@nestjs/testing';
import { ConstellationsController } from '../src/constellations/constellations.controller';
import { ConstellationsService } from '../src/constellations/constellations.service';
import { ConstellationType } from '../src/entities/constellation.entity';
import { Constellation } from '../src/entities/constellation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('ConstellationsController', () => {
  let controller: ConstellationsController;
  let repo: Repository<Constellation>;

  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ConstellationsController],
      providers: [
        ConstellationsService,
        {
          provide: getRepositoryToken(Constellation),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ConstellationsController>(ConstellationsController);
    repo = module.get<Repository<Constellation>>(
      getRepositoryToken(Constellation),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    jest.spyOn(repo, 'find').mockResolvedValue(
      mockData.map((data) => ({
        ...data,
        type: 'ZODIAC' as ConstellationType,
      })),
    );

    const result = await controller.list('2', '0');
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

    const result = await controller.getById(1);
    expect(result).toEqual(mockData);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should search constellations by name', async () => {
    const mockData: Constellation[] = [
      {
        id: 1,
        name: 'Aries',
        type: 'ZODIAC' as ConstellationType,
        createdAt: new Date(),
      },
    ];
    jest.spyOn(repo, 'find').mockResolvedValue(mockData);

    const result = await controller.search('Aries', '1');
    expect(result).toEqual(mockData);
    // expect(mockRepository.find).toHaveBeenCalledWith({
    //   where: { name: 'Aries' },
    //   take: 1,
    //   order: { name: 'ASC' },
    // });
  });
});
