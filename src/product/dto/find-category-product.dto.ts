import { IsNumber, IsString } from 'class-validator';

export class FindByCategoryDto {
  @IsString()
  category: string;

  @IsNumber()
  limit: number;
}
