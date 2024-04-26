import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReviewModel} from "./review.model/review.model";
import {FindOptionsWhere, Repository} from "typeorm";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {ProductModel} from "../product/product.model/product.model";

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(ReviewModel) private readonly reviewModel: Repository<ReviewModel>) {
    }

   async create (createReviewDto: Omit<ReviewModel, 'id'>){
        return this.reviewModel.create(createReviewDto);
    }

    async get (id: FindOneOptions<ReviewModel>){
        return await this.reviewModel.findOne(id);
    }

    async getByProductId(productId: FindOptionsWhere<ProductModel>){
        return await this.reviewModel.find({where: {productId: productId}});
    }

    async getAll() {
        return await this.reviewModel.find();
    }

    async delete(id: FindOneOptions<ReviewModel>) {
        const entityToRemove = await this.get(id);
        if (entityToRemove){
            return await this.reviewModel.remove([entityToRemove]);
        } else {
            return null;
        }
    }

    async deleteByProduct(productId: FindOptionsWhere<ProductModel> ){
        const entityToRemove = await this.getByProductId(productId);
        if (entityToRemove){
            return await this.reviewModel.remove(entityToRemove);
        } else {
            return null;
        }
    }
}
