import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly service: SeriesService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateSeriesDto) {
    return this.service.create(dto);
  }
}
