import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StoryboardsService } from './storyboards.service';
import { CreateStoryboardDto } from './dto/create-storyboard.dto';

@ApiTags('storyboards')
@Controller('storyboards')
export class StoryboardsController {
  constructor(private readonly service: StoryboardsService) {}

  @ApiOperation({ summary: 'Lista storyboarders' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca storyboarder por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria storyboarder' })
  @Post()
  create(@Body() dto: CreateStoryboardDto) {
    return this.service.create(dto);
  }
}
