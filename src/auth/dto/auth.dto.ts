import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignIn {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class JwtPayload {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
