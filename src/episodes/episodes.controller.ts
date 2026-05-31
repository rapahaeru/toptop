import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly service: EpisodesService) {}

  @Get()
  list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('seriesId') seriesId?: string,
  ) {
    return this.service.list(
      Number(limit) || 50,
      Number(offset) || 0,
      seriesId ? Number(seriesId) : undefined,
    );
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.service.create(dto);
  }
}
