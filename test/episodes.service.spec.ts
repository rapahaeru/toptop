import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '../src/entities/episode.entity';
import { EpisodesService } from '../src/episodes/episodes.service';
import { CreateEpisodeDto } from '../src/episodes/dto/create-episode.dto';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockDate = new Date('1986-10-11');

const makeEpisode = (overrides: Partial<Episode> = {}): Episode =>
  ({
    id: 1,
    title: 'Pegasus! A Armadura do Herói Lendário',
    broadcastedDate: mockDate,
    series: { id: 1 } as any,
    animationDirector: { id: 1 } as any,
    script: { id: 1 } as any,
    storyboard: { id: 1 } as any,
    createdBy: { id: 1 } as any,
    updatedBy: { id: 1 } as any,
    createdTime: mockDate,
    updatedTime: mockDate,
    ...overrides,
  }) as Episode;

describe('EpisodesService', () => {
  let service: EpisodesService;
  let repo: Repository<Episode>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodesService,
        {
          provide: getRepositoryToken(Episode),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
    repo = module.get<Repository<Episode>>(getRepositoryToken(Episode));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return episodes without seriesId filter', async () => {
      const mockData = [
        makeEpisode(),
        makeEpisode({ id: 2, title: 'Episódio 2' }),
      ];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.list(50, 0);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {},
        take: 50,
        skip: 0,
        order: { id: 'ASC' },
        relations: ['series', 'animationDirector', 'script', 'storyboard'],
      });
    });

    it('should return episodes filtered by seriesId', async () => {
      const mockData = [makeEpisode()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await service.list(10, 0, 1);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { series: { id: 1 } },
        take: 10,
        skip: 0,
        order: { id: 'ASC' },
        relations: ['series', 'animationDirector', 'script', 'storyboard'],
      });
    });

    it('should respect limit and offset', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await service.list(5, 10);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 5, skip: 10 }),
      );
    });
  });

  describe('findById', () => {
    it('should return an episode by id with all relations', async () => {
      const mockData = makeEpisode();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await service.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [
          'series',
          'animationDirector',
          'script',
          'storyboard',
          'createdBy',
          'updatedBy',
        ],
      });
    });

    it('should return null when episode is not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    const dto: CreateEpisodeDto = {
      title: 'Pegasus! A Armadura do Herói Lendário',
      broadcastedDate: '1986-10-11',
      seriesId: 1,
      animationDirectorId: 2,
      scriptId: 3,
      storyboardId: 4,
    };

    it('should create and save an episode using userId 1 by default', async () => {
      const built = makeEpisode();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: dto.title,
          series: { id: 1 },
          animationDirector: { id: 2 },
          script: { id: 3 },
          storyboard: { id: 4 },
          createdBy: { id: 1 },
          updatedBy: { id: 1 },
        }),
      );
      expect(mockRepository.save).toHaveBeenCalledWith(built);
      expect(result).toEqual(built);
    });

    it('should use the provided userId', async () => {
      const built = makeEpisode({
        createdBy: { id: 7 } as any,
        updatedBy: { id: 7 } as any,
      });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dto, 7);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          createdBy: { id: 7 },
          updatedBy: { id: 7 },
        }),
      );
    });

    it('should handle missing broadcastedDate', async () => {
      const dtoWithoutDate: CreateEpisodeDto = {
        ...dto,
        broadcastedDate: undefined,
      };
      const built = makeEpisode({ broadcastedDate: undefined });
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      await service.create(dtoWithoutDate);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ broadcastedDate: undefined }),
      );
    });
  });
});
