import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.model/product.model';
import { ProductService } from './product.service';
import { ReviewModel } from '../review/review.model/review.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, ReviewModel])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule],
})
export class ProductModule {}
