import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScriptDto {
  @ApiProperty({ example: 'Takao Kogure' })
  @IsString()
  @MaxLength(255)
  name!: string;
}
