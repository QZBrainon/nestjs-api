import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from "class-validator"

export class SignUp {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @IsOptional()
    @IsString()
    role?: string
}

export class SignIn {
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}

export class JwtPayload {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    role: string
}