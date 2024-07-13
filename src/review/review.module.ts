import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramModule } from 'src/telegram/telegram.module';
import { ProductModel } from '../product/product.model/product.model';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewModel, ProductModel]),
    TelegramModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService, ReviewModule],
})
export class ReviewModule {}
