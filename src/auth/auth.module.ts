import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModel} from "./auth.model/auth.model";

@Module({
  imports: [TypeOrmModule.forFeature([AuthModel])],
  controllers: [AuthController]
})
export class AuthModule {}
