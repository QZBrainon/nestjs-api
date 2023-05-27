import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedUser, SignIn } from './dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorators';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<AuthenticatedUser> {
    const jwtToken = this.authService.signUp(createUserDto);
    return jwtToken;
  }

  @Post('signin')
  signIn(@Body() signInDto: SignIn): Promise<AuthenticatedUser> {
    const jwtToken = this.authService.signIn(signInDto);
    return jwtToken;
  }

  // Testing to see if auth guard works. It does work. Leaving it commented for further reference
  // @UseGuards(JwtGuard)
  // @Get('me')
  // async getMe(@GetUser() user: User){
  //     return user
  // }
}
