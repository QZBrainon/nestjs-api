import * as argon from 'argon2';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn, SignUp } from './dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signUp(dto: SignUp): Promise<{token: string}>{
        try {
            const hashedPassword = await argon.hash(dto.password)
            const user = await this.db.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                    role: dto.role || 'customer'
                }
            })
            return {token: await this.signToken(user)}
        } catch (error) {
            throw new ForbiddenException('Username or email already taken')
        }
    }

    async signIn(dto: SignIn): Promise<{token: string}>{
        try {
            const user = await this.db.user.findFirst({
                where: {
                    email: dto.email
                }
            })
            await argon.verify(user?.password, dto.password)
            return {token: await this.signToken(user)}
        } catch (error) {
            throw new NotFoundException('Incorrect email or password')
        }
    }

    signToken(user: User): Promise<string> {
        return this.jwt.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, {secret: this.config.get('JWT_SECRET'), expiresIn:'7d'})
    }

}
