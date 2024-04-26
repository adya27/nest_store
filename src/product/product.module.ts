import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductModel} from "./product.model/product.model";
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
