import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductionStudiosService } from './production-studios.service';
import { CreateProductionStudioDto } from './dto/create-production-studio.dto';

@ApiTags('production-studios')
@Controller('production-studios')
export class ProductionStudiosController {
  constructor(private readonly service: ProductionStudiosService) {}

  @ApiOperation({ summary: 'Lista estúdios de produção' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca estúdio por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria estúdio de produção' })
  @Post()
  create(@Body() dto: CreateProductionStudioDto) {
    return this.service.create(dto);
  }
}
