import { IsString, MaxLength } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
