import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn, SignUp } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService) {}

    async signIn(dto: SignIn): Promise<User>{
            const user = await this.db.user.findFirst({
                where: {
                    email: dto.email,
                    password: dto.password
                }
            })
            if (!user) throw new NotFoundException() 
            return user
    }

    async signUp(dto: SignUp): Promise<User>{
        try {
            const user = await this.db.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: dto.password,
                    role: dto.role || 'customer'
                }
            })
            return user
        } catch (error) {
            throw new ForbiddenException('Username or email already taken')
        }
    }
}
