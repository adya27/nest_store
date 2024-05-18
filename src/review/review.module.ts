import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';
import { ProductModel } from '../product/product.model/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewModel, ProductModel])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewModule],
})
export class ReviewModule {}
