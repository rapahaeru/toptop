import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria episódio' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateEpisodeDto, @CurrentUser('sub') userId: number) {
    return this.service.create(dto, userId);
  }
}
