import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { StoryboardsService } from './storyboards.service';
import { CreateStoryboardDto } from './dto/create-storyboard.dto';

@Controller('storyboards')
export class StoryboardsController {
  constructor(private readonly service: StoryboardsService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateStoryboardDto) {
    return this.service.create(dto);
  }
}
