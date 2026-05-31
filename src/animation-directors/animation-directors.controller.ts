import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnimationDirectorsService } from './animation-directors.service';
import { CreateAnimationDirectorDto } from './dto/create-animation-director.dto';

@ApiTags('animation-directors')
@Controller('animation-directors')
export class AnimationDirectorsController {
  constructor(private readonly service: AnimationDirectorsService) {}

  @ApiOperation({ summary: 'Lista diretores de animação' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca diretor de animação por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria diretor de animação' })
  @Post()
  create(@Body() dto: CreateAnimationDirectorDto) {
    return this.service.create(dto);
  }
}
