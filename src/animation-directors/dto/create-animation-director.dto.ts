import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimationDirectorDto {
  @ApiProperty({ example: 'Shingo Araki' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
