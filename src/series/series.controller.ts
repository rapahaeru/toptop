import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';

@ApiTags('series')
@Controller('series')
export class SeriesController {
  constructor(private readonly service: SeriesService) {}

  @ApiOperation({ summary: 'Lista séries' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca série por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria série' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSeriesDto, @CurrentUser('sub') userId: number) {
    return this.service.create(dto, userId);
  }
}
