import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {ReviewModule} from './review/review.module';
import {TopPageModule} from './top-page/top-page.module';
import {ProductModule} from './product/product.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ProductModel} from "./product/product.model/product.model";
import {AuthModel} from "./auth/auth.model/auth.model";
import {ReviewModel} from "./review/review.model/review.model";
import {TopPageModel} from "./top-page/top-page.model/top-page.model";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ReviewModule,
        TopPageModule,
        ProductModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'postgres',
            entities: [ProductModel, AuthModel, ReviewModel, TopPageModel],
            synchronize: true,
        }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
