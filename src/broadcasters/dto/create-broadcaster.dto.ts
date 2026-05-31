import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBroadcasterDto {
  @ApiProperty({ example: 'TV Asahi' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
