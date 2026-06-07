import { jest, expect, describe, it, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '../src/entities/episode.entity';
import { EpisodesController } from '../src/episodes/episodes.controller';
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
    series: { id: 1 } as Episode['series'],
    animationDirector: { id: 1 } as Episode['animationDirector'],
    script: { id: 1 } as Episode['script'],
    storyboard: { id: 1 } as Episode['storyboard'],
    createdBy: { id: 1 } as Episode['createdBy'],
    updatedBy: { id: 1 } as Episode['updatedBy'],
    createdTime: mockDate,
    updatedTime: mockDate,
    ...overrides,
  }) as Episode;

describe('EpisodesController', () => {
  let controller: EpisodesController;
  let repo: Repository<Episode>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [
        EpisodesService,
        {
          provide: getRepositoryToken(Episode),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
    repo = module.get<Repository<Episode>>(getRepositoryToken(Episode));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return episodes with default limit and offset', async () => {
      const mockData = [
        makeEpisode(),
        makeEpisode({ id: 2, title: 'Episódio 2' }),
      ];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined, undefined);

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 50, skip: 0 }),
      );
    });

    it('should pass limit and offset to service', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list('10', '20', undefined);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10, skip: 20 }),
      );
    });

    it('should filter by seriesId when provided', async () => {
      const mockData = [makeEpisode()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData);

      const result = await controller.list(undefined, undefined, '1');

      expect(result).toEqual(mockData);
      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ where: { series: { id: 1 } } }),
      );
    });

    it('should not filter by series when seriesId is absent', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      await controller.list(undefined, undefined, undefined);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ where: {} }),
      );
    });
  });

  describe('findById', () => {
    it('should return an episode by id', async () => {
      const mockData = makeEpisode();
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findById(1);

      expect(result).toEqual(mockData);
      expect(mockRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('should return null when episode does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      const result = await controller.findById(999);

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

    it('should create and return the new episode', async () => {
      const built = makeEpisode();
      jest.spyOn(repo, 'create').mockReturnValue(built);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(built);

      const result = await controller.create(dto);

      expect(result).toEqual(built);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});
