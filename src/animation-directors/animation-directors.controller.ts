import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AnimationDirectorsService } from './animation-directors.service';
import { CreateAnimationDirectorDto } from './dto/create-animation-director.dto';

@Controller('animation-directors')
export class AnimationDirectorsController {
  constructor(private readonly service: AnimationDirectorsService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAnimationDirectorDto) {
    return this.service.create(dto);
  }
}
