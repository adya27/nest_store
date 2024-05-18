import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from './product.model/product.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productModel: Repository<ProductModel>,
  ) {}

  async create(productDto: Omit<ProductModel, 'id'>) {
    try {
      console.log('-------- try to create: ', productDto);
      const product = this.productModel.create(productDto);
      return this.productModel.save(product);
    } catch (e) {
      console.log(e, 'cant create');
    }
  }

  async get(id: FindOptionsWhere<ProductModel>) {
    console.log('-------- try to get: ', id);
    return this.productModel.find({ where: id, take: 1 });
  }

  async getAllProducts() {
    console.log('-------- try to getAllProducts: ');
    return await this.productModel.find({ take: 100 });
  }

  async delete(id: number) {
    console.log('-------- try to get: ', id);
    return await this.productModel.delete(id);
  }

  async update(id: number, productDto: Omit<ProductModel, 'id'>) {
    console.log('-------- try to get: ', id);
    return await this.productModel.update(id, productDto);
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
}
