import { IsString, MaxLength } from 'class-validator';

export class CreateAnimationDirectorDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
