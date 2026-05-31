import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListConstellationsDTO {
  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsOptional()
  limit: number = 50;

  @ApiProperty({ example: 50 })
  @IsNumber()
  offset?: number = 0;
}
