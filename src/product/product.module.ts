import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductModel} from "./product.model/product.model";

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController]
})
export class ProductModule {}
