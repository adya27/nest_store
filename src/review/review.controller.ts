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
import { FindOperator, FindOptionsWhere } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { TelegramService } from '../telegram/telegram.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

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

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() reviewDto: CreateReviewDto) {
    console.log('-------- notify ', reviewDto);
    const message = `Name: ${reviewDto.title}\n Description: ${reviewDto.description}`;
    return this.telegramService.sendMessage(message);
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
