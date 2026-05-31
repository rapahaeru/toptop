import { IsDateString, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty({ example: 'Pegasus! A Armadura do Herói Lendário' })
  @IsString()
  @MaxLength(255)
  title!: string;

  @ApiPropertyOptional({ example: '1986-10-11' })
  @IsDateString()
  @IsOptional()
  broadcastedDate?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  seriesId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  animationDirectorId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  scriptId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  storyboardId!: number;
}
