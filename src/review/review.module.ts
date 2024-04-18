import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReviewModel} from "./review.model/review.model";
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewModel])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
