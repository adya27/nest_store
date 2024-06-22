import { IsNumber } from 'class-validator';

export class FindProductDto {
  @IsNumber()
  price: number;

  @IsNumber()
  limit: number;
}
