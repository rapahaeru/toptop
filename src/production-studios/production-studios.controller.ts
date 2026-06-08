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
import { CreateProductionStudioDto } from './dto/create-production-studio.dto';
import { ProductionStudiosService } from './production-studios.service';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria estúdio de produção' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateProductionStudioDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.service.create(dto, userId);
  }
}
