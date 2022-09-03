import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  // @IsString({ message: `The brand must be a cool string` }) Custom error message
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly brand?: string;
  @IsString()
  @IsOptional()
  readonly model?: string;
}
