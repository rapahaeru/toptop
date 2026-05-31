import { IsString, MaxLength } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
