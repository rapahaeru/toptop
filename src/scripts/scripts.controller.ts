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
import { ScriptsService } from './scripts.service';
import { CreateScriptDto } from './dto/create-script.dto';

@ApiTags('scripts')
@Controller('scripts')
export class ScriptsController {
  constructor(private readonly service: ScriptsService) {}

  @ApiOperation({ summary: 'Lista roteiristas' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.service.list(Number(limit) || 50, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Busca roteirista por ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria roteirista' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateScriptDto, @CurrentUser('sub') userId: number) {
    return this.service.create(dto, userId);
  }
}
