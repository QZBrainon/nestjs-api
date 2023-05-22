import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, SignUp } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() createUserDto: SignUp): Promise<{token: string}> {
        const jwtToken = this.authService.signUp(createUserDto)
        return jwtToken
    }

    @Post('signin')
    signIn(@Body() loginDto: SignIn): Promise<{token: string}> {
        const jwtToken = this.authService.signIn(loginDto)
        return jwtToken
    }
}
