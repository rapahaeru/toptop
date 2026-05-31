import { IsDateString, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsDateString()
  @IsOptional()
  broadcastedDate?: string;

  @IsInt()
  @IsPositive()
  seriesId!: number;

  @IsInt()
  @IsPositive()
  animationDirectorId!: number;

  @IsInt()
  @IsPositive()
  scriptId!: number;

  @IsInt()
  @IsPositive()
  storyboardId!: number;
}
