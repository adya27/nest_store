import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FindByCategoryDto } from './dto/find-category-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductDto } from './dto/product.dto';
import {
  CANT_CREATE_PRODUCT,
  CANT_DELETE_PRODUCT,
  CANT_FIND_PRODUCT,
} from './product.constants';
import { ProductModel } from './product.model/product.model';
import { ReviewModel } from 'src/review/review.model/review.model';
import { FindProduct } from '../review/dto/FindProductResponse';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productModel: Repository<ProductModel>,
    @InjectRepository(ReviewModel)
    private readonly reviewModel: Repository<ReviewModel>,
  ) {}

  async create(productDto: ProductDto) {
    try {
      console.log('-------- try to create: ', productDto);
      const product = this.productModel.create(productDto);
      return this.productModel.save(product);
    } catch (e) {
      console.error(e, 'cant create');
      throw new InternalServerErrorException(CANT_CREATE_PRODUCT);
    }
  }

  async get(id: FindOptionsWhere<ProductModel>) {
    console.log('-------- try to get: ', id);
    const product = await this.productModel.find({ where: id, take: 1 });
    if (!product) {
      throw new NotFoundException(CANT_FIND_PRODUCT);
    }
    return product;
  }

  async getAllProducts() {
    console.log('-------- try to getAllProducts: ');
    return await this.productModel.find({ take: 100 });
  }

  async delete(id: number) {
    console.log('-------- try to get: ', id);
    const deletedProductInfo = await this.productModel.delete(id);
    if (!deletedProductInfo) {
      throw new NotFoundException(CANT_DELETE_PRODUCT);
    }
    if (!deletedProductInfo.affected) {
      throw new NotFoundException(CANT_FIND_PRODUCT);
    }
    return deletedProductInfo;
  }

  async update(id: number, productDto: ProductDto) {
    console.log('-------- try to get: ', id);
    const updatedProductInfo = await this.productModel.update(id, productDto);
    if (!updatedProductInfo) {
      throw new NotFoundException(CANT_DELETE_PRODUCT);
    }
    if (!updatedProductInfo.affected) {
      throw new NotFoundException(CANT_FIND_PRODUCT);
    }
    return updatedProductInfo;
  }

  async findByParams(findProductDto: FindProductDto) {
    console.log(
      '-------- try to get by params findProductDto: ',
      findProductDto,
    );
    return this.productModel.find({
      where: { price: findProductDto.price },
      take: findProductDto.limit,
    });
  }

  async findByCategory(findByCategoryDto: FindByCategoryDto) {
    console.log(
      '-------- try to get by params findProductDto: ',
      findByCategoryDto,
    );

    const { category, limit } = findByCategoryDto;

    // Получить продукты по категории и лимиту
    const products: FindProduct[] = await this.productModel
      .createQueryBuilder('product')
      .where('product.categories @> :category', { category: [category] }) // Assuming categories is an array
      .limit(limit)
      .getMany();

    // Добавить рецензии и рассчитанный рейтинг для каждого продукта
    for (const product of products) {
      const reviews = await this.reviewModel
        .createQueryBuilder('review')
        .where('review.productId = :productId', { productId: product.id })
        .getMany();

      product.reviews = reviews;
      product.calculatedRating =
        reviews.length > 0
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
            reviews.length
          : null;
    }

    return products;
  }
}
