import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';

@ApiTags('directors')
@Controller('directors')
export class DirectorsController {
  constructor(private readonly service: DirectorsService) {}

  @ApiOperation({ summary: 'Lista diretores' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca diretor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria diretor' })
  @Post()
  create(@Body() dto: CreateDirectorDto) {
    return this.service.create(dto);
  }
}
