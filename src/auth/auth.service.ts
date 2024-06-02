import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './auth.model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { compare } from 'bcrypt';
import {
  USER_IS_ALREADY_CREATED,
  USER_IS_NOT_FOUND,
  USER_PASSWORD_MISMATCH,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExist = await this.findUser(createUserDto.email);
    if (alreadyExist) {
      throw new BadRequestException(USER_IS_ALREADY_CREATED);
    } else {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.findUser(loginUserDto.email);
    if (!user) {
      return new BadRequestException(USER_IS_NOT_FOUND);
    }
    const checked = compare(loginUserDto.password, user.passwordHash);
    if (!checked) {
      return new BadRequestException(USER_PASSWORD_MISMATCH);
    }
    console.log('user: ', user);
    console.log('user typeof: ', typeof user);
    console.log('{ email: user.email }: ', { email: user.email });

    return await this.jwtService.signAsync({ email: user.email });
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
  }
}
