import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({ example: 'Toei' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
