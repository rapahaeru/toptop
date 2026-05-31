import { IsString, MaxLength } from 'class-validator';

export class CreateStoryboardDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
