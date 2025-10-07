import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ConstellationsService } from './constellations.service';

@Controller('constellations')
export class ConstellationsController {
  constructor(private readonly service: ConstellationsService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const l = Number(limit ?? 50);
    const o = Number(offset ?? 0);
    return this.service.list(l, o);
  }

  @Get('search')
  search(@Query('name') name: string, @Query('limit') limit?: string) {
    return this.service.searchByName(name ?? '', Number(limit ?? 20));
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
