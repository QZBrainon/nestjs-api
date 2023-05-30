import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedUser, SignIn } from './dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<AuthenticatedUser> {
    const jwtToken = this.authService.signUp(createUserDto);
    return jwtToken;
  }

  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignIn): Promise<AuthenticatedUser> {
    const jwtToken = this.authService.signIn(signInDto);
    return jwtToken;
  }
}
