import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),PrismaModule, AuthModule, UserModule, ProductModule, SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
