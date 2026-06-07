import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BroadcastersService } from './broadcasters.service';
import { CreateBroadcasterDto } from './dto/create-broadcaster.dto';

@ApiTags('broadcasters')
@Controller('broadcasters')
export class BroadcastersController {
  constructor(private readonly service: BroadcastersService) {}

  @ApiOperation({ summary: 'Lista emissoras' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca emissora por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cria emissora' })
  @Post()
  create(@Body() dto: CreateBroadcasterDto) {
    return this.service.create(dto);
  }
}
