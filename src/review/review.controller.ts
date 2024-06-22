import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';
import { FindOperator, FindOptionsWhere } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('getAllReviews')
  async getAll() {
    console.log('-------- getAll ');
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async post(@Body() reviewDto: CreateReviewDto) {
    console.log('-------- post id ', reviewDto);
    return this.reviewService.create(reviewDto);
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: number | FindOperator<number>,
    @UserEmail() email: string,
  ) {
    console.log('-------- getByProduct id ', productId);
    console.log('email', email);
    return this.reviewService.getByProductId(productId);
  }

  @Delete('remove/:id')
  async remove(@Param() id: FindOptionsWhere<ReviewModel>) {
    console.log('-------- remove id ', id);
    return await this.reviewService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
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
