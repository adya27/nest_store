import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';
import { FindOperator, FindOptionsWhere } from 'typeorm';
// import { ProductModel } from '../product/product.model/product.model';
// import { FindOptionsWhere } from 'typeorm';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('getAllReviews')
  async getAll() {
    console.log('-------- getAll ');
    return this.reviewService.getAll();
  }

  @Post('create')
  async post(@Body() reviewDto: Omit<ReviewModel, 'id, createdAt'>) {
    console.log('-------- post id ', reviewDto);
    return this.reviewService.create(reviewDto);
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: number | FindOperator<number>,
  ) {
    console.log('-------- getByProduct id ', productId);
    return this.reviewService.getByProductId(productId);
  }

  @Delete('remove/:id')
  async remove(@Param() id: FindOptionsWhere<ReviewModel>) {
    console.log('-------- remove id ', id);
    return await this.reviewService.delete(id);
  }

  @Delete('removeByProduct/:productId')
  async removeByProduct(
    @Param('productId') productId: number | FindOperator<number>,
  ) {
    console.log('-------- removeByProduct id ', productId);
    return await this.reviewService.deleteByProduct(productId);
  }

  @Get(':id')
  async get(@Param() id: FindOptionsWhere<ReviewModel>) {
    console.log('-------- get id ', id);
    return this.reviewService.get(id);
  }
}
