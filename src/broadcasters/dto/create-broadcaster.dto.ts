import { IsString, MaxLength } from 'class-validator';

export class CreateBroadcasterDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
