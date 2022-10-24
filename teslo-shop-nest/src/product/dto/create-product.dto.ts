import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsPositive, IsOptional, IsInt, IsIn, MinLength, IsArray } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true})
    @IsArray()
    sizes: string[]

    @ApiProperty()
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty()
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    tags: string[]

    @ApiProperty()
    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    images?: string[]
}
