import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TopPageModel} from "./top-page.model/top-page.model";

@Module({
  imports: [TypeOrmModule.forFeature([TopPageModel])],
  controllers: [TopPageController]
})
export class TopPageModule {}
