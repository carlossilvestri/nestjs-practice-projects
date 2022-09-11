import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';

// PartialType hace que todas las propiedades sean opcionales.
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
