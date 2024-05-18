import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { FindOptionsWhere } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() productDto: ProductModel) {
    productDto.createdAt = new Date();
    console.log('-------- create product id ', productDto);
    return await this.productService.create(productDto);
  }

  @Get('getAllProducts')
  async getAllProducts() {
    console.log('-------- get getAllProducts id ');
    return await this.productService.getAllProducts();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    console.log('-------- delete product id ', id);
    return await this.productService.delete(id);
  }

  @Patch('update/:id')
  async patch(@Param('id') id: number, @Body() productModel: ProductModel) {
    console.log('-------- patch product id: ', id, '  body: ', productModel);
    return await this.productService.update(id, productModel);
  }

  @Post('/findByParams')
  @HttpCode(200)
  async findByParams(@Body() findDto: FindProductDto) {
    console.log('-------- findByParams product findDto: ', findDto);
    return await this.productService.findByParams(findDto);
  }

  @Get(':id')
  async get(@Param() id: FindOptionsWhere<ProductModel>) {
    console.log('-------- get product id ', id);
    return await this.productService.get(id);
  }
}
