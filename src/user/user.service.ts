import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon.hash(createUserDto.password);
    const user = await this.db.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role || 'customer',
      },
    });
    delete user.password;
    return user;
  }

  async findAll() {
    return this.db.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async findOne(id: string) {
    try {
      const user = await this.db.user.findUnique({ where: { id } });
      delete user.password;
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException();
    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new NotFoundException('Invalid user');
    }
  }

  async remove(id: string) {
    try {
      await this.db.user.delete({ where: { id } });
      return { message: 'User deleted' };
    } catch (error) {
      throw new NotFoundException('Invalid user');
    }
  }
}
