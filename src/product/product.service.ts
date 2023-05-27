import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private db: PrismaService) {}

  async getAllProducts() {
    return await this.db.product.findMany();
  }
}
