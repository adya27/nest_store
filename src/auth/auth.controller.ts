import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: AuthDto): Promise<any> {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() credentials: AuthDto): Promise<any> {
    return this.authService.register(credentials);
  }
}
