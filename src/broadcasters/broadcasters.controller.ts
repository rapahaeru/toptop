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
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateBroadcasterDto } from './dto/create-broadcaster.dto';
import { BroadcastersService } from './broadcasters.service';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria emissora' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Body() dto: CreateBroadcasterDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.service.create(dto, userId);
  }
}
