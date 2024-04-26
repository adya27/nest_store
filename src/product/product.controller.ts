import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {ProductModel} from "./product.model/product.model";
import {FindProductDto} from "./dto/find-product.dto";
import {ProductService} from "./product.service";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @Post('create')
    async create(@Body() productDto: ProductModel) {
        productDto.id = 'id' + (new Date()).getTime();
        productDto.createdAt = (new Date()).getTime();
        return await this.productService.create(productDto);
    }

    @Get(':id')
    async get(@Param('id') id: FindOneOptions<ProductModel>){
        return await this.productService.get(id);
    }

    @Get('getAllProducts')
    async getAllProducts(){
        return await this.productService.getAllProducts();
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:string){

    }

    @Patch('update/:id')
        async patch(@Param('id') id:string, @Body() productModel: ProductModel){

    }

    @Post(':id')
    @HttpCode(200)
    async find(@Body() findDto: FindProductDto){

    }
}
