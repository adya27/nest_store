import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/auth.model/user.model';
import { AuthModule } from './auth/auth.module';
import { getTelegramConfig } from './configs/telegram.config';
import { FilesModule } from './files/files.module';
import { ProductModel } from './product/product.model/product.model';
import { ProductModule } from './product/product.module';
import { ReviewModel } from './review/review.model/review.model';
import { ReviewModule } from './review/review.module';
import { TelegramModule } from './telegram/telegram.module';
import { TopPageModel } from './top-page/top-page.model/top-page.model';
import { TopPageModule } from './top-page/top-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
        entities: [ProductModel, User, ReviewModel, TopPageModel],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    FilesModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegramConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
