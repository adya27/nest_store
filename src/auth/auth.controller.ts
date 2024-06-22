import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() credentials: LoginUserDto): Promise<any> {
    return this.authService.loginUser(credentials);
  }

  @Post('register')
  async register(@Body() credentials: LoginUserDto): Promise<any> {
    const salt = genSaltSync(10);
    const createUserDto: CreateUserDto = {
      email: credentials.email,
      passwordHash: hashSync(credentials.password, salt),
    };

    return this.authService.createUser(createUserDto);
  }
}
