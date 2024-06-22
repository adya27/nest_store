import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class ProductCharacteristicsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsNumber()
  calculateRating?: number;

  @IsArray()
  @IsString({ each: true })
  description: string;

  @IsArray()
  @IsString({ each: true })
  advantages: string[];

  @IsArray()
  @IsString({ each: true })
  disadvantages: string[];

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[];
}
