import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModel } from './auth.model/auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthModel])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
