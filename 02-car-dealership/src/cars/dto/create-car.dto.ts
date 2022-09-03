import { IsString } from 'class-validator';

export class CreateCarDto {
  // @IsString({ message: `The brand must be a cool string` }) Custom error message
  @IsString()
  readonly brand: string;
  @IsString()
  readonly model: string;
}
