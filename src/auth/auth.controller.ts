import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, SignUp } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body(new ValidationPipe({whitelist: true})) createUserDto: SignUp): Promise<User> {
        const created = this.authService.signUp(createUserDto)
        return created
    }

    @Post('signin')
    signIn(@Body(new ValidationPipe({whitelist: true})) loginDto: SignIn): Promise<User> {
        const created = this.authService.signIn(loginDto)
        return created
    }
}
