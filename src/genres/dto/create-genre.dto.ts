import { IsString, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
