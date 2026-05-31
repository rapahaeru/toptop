import { IsDateString, IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { SeriesType } from '../../entities/series.entity';

export class CreateSeriesDto {
  @ApiProperty({ example: 'Saint Seiya' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ example: '1986-10-11' })
  @IsDateString()
  releaseDate!: string;

  @ApiPropertyOptional({ example: '1986-10-11' })
  @IsDateString()
  @IsOptional()
  releaseStartDate?: string;

  @ApiPropertyOptional({ example: '1989-04-01' })
  @IsDateString()
  @IsOptional()
  releaseEndDate?: string;

  @ApiPropertyOptional({ enum: ['TV', 'OVA', 'ONA', 'MOVIE'], example: 'TV' })
  @IsEnum(['TV', 'OVA', 'ONA', 'MOVIE'])
  @IsOptional()
  type?: SeriesType;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  directorId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  genreId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productionStudioId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  broadcasterId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  producerId!: number;
}
