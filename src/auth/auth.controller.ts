import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, SignUp } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMe(@Req() req: Request){
        return req.user
    }
}
