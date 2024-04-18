import {Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post} from '@nestjs/common';
import {ProductDto} from "./dto/product.dto";
import {ProductModel} from "./product.model/product.model";
import {FindProductDto} from "./dto/find-product.dto";

@Controller('product')
export class ProductController {
    constructor(){}

    @Post('create')
    async create(@Body() productDto: Omit<ProductModel, 'id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string){

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
