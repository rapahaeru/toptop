import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { BroadcastersService } from './broadcasters.service';
import { CreateBroadcasterDto } from './dto/create-broadcaster.dto';

@Controller('broadcasters')
export class BroadcastersController {
  constructor(private readonly service: BroadcastersService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateBroadcasterDto) {
    return this.service.create(dto);
  }
}
