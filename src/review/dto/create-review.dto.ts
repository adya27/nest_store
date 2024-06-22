import { Type } from 'class-transformer';
import { IsString, IsNumber, Max, Min } from 'class-validator';
import { ProductModel } from '../../product/product.model/product.model';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsNumber()
  @Max(5, { message: 'Rating must be less than or equal to 5' })
  @Min(1)
  rating: number;

  @Type(() => ProductModel)
  product: ProductModel;
}
