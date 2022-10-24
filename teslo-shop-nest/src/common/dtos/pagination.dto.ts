import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, Min, IsInt } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        default: 10,
        description: 'Rows that you need',
        required: false
    })
    @IsOptional()
    @IsInt()
    // Transformar de string a number sin esto vendria asi Ejm: '10'
    @Type(() => Number) // enableImplicitConvertions: true
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Rows that you want to skip',
        required: false
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number) // enableImplicitConvertions: true
    offset?: number;
}