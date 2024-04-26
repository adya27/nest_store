import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductModel} from "./product.model/product.model";
import {Repository} from "typeorm";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductModel) private readonly productModel: Repository<ProductModel> ) {
    }

    async create(productDto: Omit<ProductModel, 'id'>){
        try{
            console.log("try to create: ", productDto)
            return this.productModel.create(productDto);
        } catch (e) {
            console.log(e, "cant create")
        }
    }

    async get(id: FindOneOptions<ProductModel>){
        return this.productModel.findOne(id);
    }

    async getAllProducts() {
        return await this.productModel.find( {});
    }
}
