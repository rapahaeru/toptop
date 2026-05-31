import { IsString, MaxLength } from 'class-validator';

export class CreateScriptDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
