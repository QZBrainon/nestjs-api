import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),PrismaModule, AuthModule, UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
