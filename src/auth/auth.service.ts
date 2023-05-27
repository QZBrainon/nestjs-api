import * as argon from 'argon2';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticatedUser, SignIn } from './dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(userDto: CreateUserDto): Promise<AuthenticatedUser> {
    try {
      const user = await this.userService.create(userDto);
      const token = await this.signToken(user);
      return { ...user, token };
    } catch (error) {
      throw new ForbiddenException('Username or email already taken');
    }
  }

  async signIn(signInDto: SignIn): Promise<AuthenticatedUser> {
    try {
      const user = await this.userService.findByEmail(signInDto.email);
      await argon.verify(user?.password, signInDto.password);
      const token = await this.signToken(user);
      return { ...user, token };
    } catch (error) {
      throw new NotFoundException('Incorrect email or password');
    }
  }

  signToken(user: User): Promise<string> {
    return this.jwt.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { secret: this.config.get('JWT_SECRET'), expiresIn: '30d' },
    );
  }
}
