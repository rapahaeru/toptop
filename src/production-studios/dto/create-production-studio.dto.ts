import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionStudioDto {
  @ApiProperty({ example: 'Toei Animation' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
