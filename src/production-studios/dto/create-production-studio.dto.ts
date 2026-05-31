import { IsString, MaxLength } from 'class-validator';

export class CreateProductionStudioDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
