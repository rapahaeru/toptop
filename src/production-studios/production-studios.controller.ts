import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductionStudiosService } from './production-studios.service';
import { CreateProductionStudioDto } from './dto/create-production-studio.dto';

@Controller('production-studios')
export class ProductionStudiosController {
  constructor(private readonly service: ProductionStudiosService) {}

  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateProductionStudioDto) {
    return this.service.create(dto);
  }
}
