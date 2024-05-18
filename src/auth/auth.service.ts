import { Injectable } from '@nestjs/common';
import { AuthModel } from './auth.model/auth.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthModel)
    private readonly authModel: Repository<AuthModel>,
  ) {}

  async register(auth: AuthDto): Promise<AuthModel> {
    const user = await this.authModel.create(auth);
    return this.authModel.save(user);
  }

  async login(auth: AuthDto): Promise<AuthModel> {
    const user = await this.authModel.create(auth);
    return this.authModel.save(user);
  }
}
