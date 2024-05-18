import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductModule } from '../src/product/product.module';

let reviewId: number;
const reviewTitle = 'test';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({
        title: reviewTitle,
        content: 'test',
        author: 'Andrii Boiadzhi',
        description: 'description',
        rating: 5,
        product: 4,
      })
      .expect(201)
      .then((response) => {
        reviewId = response.body.id;
        expect(reviewId).toBeDefined();
      });
  });

  it('/review/get (GET)', async () => {
    console.log('GET reviewId: ', reviewId);
    return request(app.getHttpServer())
      .get(`/review/${reviewId}`)
      .expect(200)
      .then((response) => {
        console.log('GET response body: ', response.body[0].title);
        const reviewTitleTest = response.body[0].title;
        expect(reviewTitleTest).toBeDefined();
        expect(reviewTitleTest).toBe(reviewTitle);
      });
  });

  it('/review/remove (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/review/remove/${reviewId}`)
      .expect(200)
      .then((response) => {
        console.log('DELETE response body: ', response.body);
        const reviewTitleTest = response.body[0].title;
        expect(reviewTitleTest).toBeDefined();
        expect(reviewTitleTest).toBe(reviewTitle);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
