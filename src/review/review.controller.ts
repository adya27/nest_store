import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {ReviewModel} from "./review.model/review.model";
import {ReviewService} from "./review.service";

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {
    }
    @Get(':id')
    async get (@Param('id') id:string){

    }

    @Post('create')
    async post(@Body() reviewDto: Omit<ReviewModel, 'id'>){
        return this.reviewService.create(reviewDto);
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param() productId: string){

    }
}
