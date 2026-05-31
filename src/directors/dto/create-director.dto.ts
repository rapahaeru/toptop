import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDirectorDto {
  @ApiProperty({ example: 'Kōzō Morishita' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
