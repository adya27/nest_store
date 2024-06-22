import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductModule } from '../src/product/product.module';
import { LoginUserDto } from 'src/auth/dto/login.user.dto';

const userCred: LoginUserDto = {
  email: 'mail@mail.com',
  password: 'string',
};

const failUserCred: LoginUserDto = {
  email: 'mail@mail2.com',
  password: 'string',
};

describe('Login (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('auth/login (Success)', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send(userCred)
      .expect(200)
      .then((response) => {
        console.log('auth/login (Success) response body: ', response.body);
        expect(response.body).toBeDefined();
      });
  });

  it('auth/login (Failure)', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send(failUserCred)
      .expect(400)
      .then((response) => {
        console.log('auth/login (Failure) response body: ', response.body);
        expect(response.body.message).toEqual(
          'User with this email is not found',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
