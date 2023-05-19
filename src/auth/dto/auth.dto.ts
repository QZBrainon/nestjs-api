import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SignUp {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    @IsString()
    role?: string
}

export class SignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}