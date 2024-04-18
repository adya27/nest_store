import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor() {

    }

    @Post('login')
    @HttpCode(200)
    async login (@Body() credentials: AuthDto): Promise<any> {

    }

    @Post('register')
    async register (@Body() credentials: AuthDto): Promise<any> {

    }
}
