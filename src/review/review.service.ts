import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewModel } from './review.model/review.model';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewModel)
    private readonly reviewModel: Repository<ReviewModel>,
  ) {}

  async create(createReviewDto: Omit<ReviewModel, 'id, createdAt'>) {
    createReviewDto.createdAt = new Date();
    const review = this.reviewModel.create(createReviewDto);
    console.log('review ', review);
    return this.reviewModel.save(review);
  }

  async get(id: FindOptionsWhere<ReviewModel>) {
    return await this.reviewModel.find({ where: id, take: 1 });
  }

  async getByProductId(productId: number | FindOperator<number>) {
    console.log('productId ', productId, '  ', typeof productId);
    return this.reviewModel.find({
      where: { product: { id: productId } },
    });
  }

  async getAll(): Promise<ReviewModel[]> {
    try {
      return this.reviewModel.find({ take: 100 });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: FindOptionsWhere<ReviewModel>) {
    const entityToRemove = await this.get(id);
    if (entityToRemove) {
      return await this.reviewModel.remove(entityToRemove);
    } else {
      return null;
    }
  }

  async deleteByProduct(productId: number | FindOperator<number>) {
    const entityToRemove = await this.getByProductId(productId);
    if (entityToRemove) {
      return await this.reviewModel.remove(entityToRemove);
    } else {
      return null;
    }
  }
}
