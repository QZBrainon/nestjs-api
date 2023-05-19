import * as argon from 'argon2';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn, SignUp } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService) {}

    async signUp(dto: SignUp): Promise<User>{
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
            delete user.id
            delete user.password
            return user
        } catch (error) {
            throw new ForbiddenException('Username or email already taken')
        }
    }

    async signIn(dto: SignIn): Promise<User>{
            const user = await this.db.user.findFirst({
                where: {
                    email: dto.email
                }
            })
            if (!user) throw new NotFoundException('Incorrect email or password')
            const pwMatches = await argon.verify(user.password, dto.password)
            if (!pwMatches) throw new ForbiddenException('Incorrect email or password')
            delete user.id
            delete user.password
            return user
    }

}
