import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@ApiTags('episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly service: EpisodesService) {}

  @ApiOperation({ summary: 'Lista episódios' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({
    name: 'seriesId',
    required: false,
    type: Number,
    description: 'Filtra por série',
  })
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

  @ApiOperation({ summary: 'Busca episódio por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria episódio' })
  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.service.create(dto);
  }
}
