import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewModel} from "./review.model/review.model";
import {Repository} from "typeorm";

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(ReviewModel) private readonly reviewModel: Repository<ReviewModel>) {
    }

   async create (createReviewDto: Omit<ReviewModel, 'id'>){
        return this.reviewModel.create(createReviewDto)
    }
}
