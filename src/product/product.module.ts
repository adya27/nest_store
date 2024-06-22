import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from 'src/review/review.module';
import { ReviewModel } from '../review/review.model/review.model';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model/product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel, ReviewModel]),
    ReviewModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductModule],
})
export class ProductModule {}
