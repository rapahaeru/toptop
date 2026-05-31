import { IsDateString, IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import type { SeriesType } from '../../entities/series.entity';

export class CreateSeriesDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsDateString()
  releaseDate!: string;

  @IsDateString()
  @IsOptional()
  releaseStartDate?: string;

  @IsDateString()
  @IsOptional()
  releaseEndDate?: string;

  @IsEnum(['TV', 'OVA', 'ONA', 'MOVIE'])
  @IsOptional()
  type?: SeriesType;

  @IsInt()
  @IsPositive()
  directorId!: number;

  @IsInt()
  @IsPositive()
  genreId!: number;

  @IsInt()
  @IsPositive()
  productionStudioId!: number;

  @IsInt()
  @IsPositive()
  broadcasterId!: number;

  @IsInt()
  @IsPositive()
  producerId!: number;
}
