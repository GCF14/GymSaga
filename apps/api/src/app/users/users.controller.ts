import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        const { email, password, username, firstName, lastName } = body;
        return this.usersService.signup(email, password, username, firstName, lastName);
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const { email, password } = body;
        return this.usersService.login(email, password);
    }
}
