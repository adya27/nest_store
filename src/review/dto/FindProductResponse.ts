import { ProductDto } from 'src/product/dto/product.dto';
import { CreateReviewDto } from './create-review.dto';

export interface FindProduct extends ProductDto {
  reviews?: CreateReviewDto[];
  calculatedRating?: number;
}
