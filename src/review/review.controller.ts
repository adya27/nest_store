import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ReviewModel} from "./review.model/review.model";
import {ReviewService} from "./review.service";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {ProductModel} from "../product/product.model/product.model";
import {FindOptionsWhere} from "typeorm";


@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {
    }
    @Get(':id')
    async get (@Param('id') id:FindOneOptions<ReviewModel>){
        return this.reviewService.get(id)
    }

    @Post('create')
    async post(@Body() reviewDto: Omit<ReviewModel, 'id'>){
        return this.reviewService.create(reviewDto);
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param() productId: FindOptionsWhere<ProductModel>){
        return this.reviewService.getByProductId(productId)
    }

    @Get('getAllReviews')
    async getAll(){
        return this.reviewService.getAll()
    }

    @Delete('remove/:id')
    async remove(@Param() id: FindOneOptions<ReviewModel>){
         return await this.reviewService.delete(id)
    }

    @Delete('removeByProduct/:productId')
    async removeByProduct(@Param() productId: FindOptionsWhere<ProductModel>){
        return await this.reviewService.deleteByProduct(productId)
    }
}
