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

// sale creating dto
// {
//   "userId":"01b382b6-8cc3-4cd2-a03a-ec019997ac89",
//   "sellerId":"dde68652-c6fe-4692-9414-f0fad7fcfc19",
//   "totalPrice": 100,
//   "deliveryAddress":"Uma rua qualquer",
//   "deliveryNumber": "1000",
//   "products": [{"productId":"1408fdbc-f421-4f16-846c-bd69aa219b75", "quantity":10}, {"productId":"298e3cec-b556-48dc-8338-f724dc177080", "quantity":3},{"productId":"9978a485-de00-4f0e-ac75-aa100182b466", "quantity":15}]
// }
