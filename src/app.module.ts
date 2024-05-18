import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModel } from './product/product.model/product.model';
import { AuthModel } from './auth/auth.model/auth.model';
import { ReviewModel } from './review/review.model/review.model';
import { TopPageModel } from './top-page/top-page.model/top-page.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ReviewModule,
    TopPageModule,
    ProductModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST'),
        port: parseInt(config.get('DB_PORT'), 10),
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE'),
        entities: [ProductModel, AuthModel, ReviewModel, TopPageModel],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
