import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ConstellationsService } from './constellations.service';
import { ListConstellationsDTO } from './dto/list-constellations.dto';

@Controller('constellations')
export class ConstellationsController {
  constructor(private readonly service: ConstellationsService) {}

  @Get()
  list(@Query() query: ListConstellationsDTO) {
    return this.service.list(
      Number(query.limit) || 50,
      Number(query.offset) || 0,
    );
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
