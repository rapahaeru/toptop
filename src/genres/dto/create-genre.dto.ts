import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Ação / Aventura / Fantasia' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
