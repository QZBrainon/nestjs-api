import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleProduct } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private db: PrismaService) {}

  async createSaleProduct(saleId: string, products: SaleProduct[]) {
    const result = products.map((product) => ({
      saleId,
      productId: product.productId,
      quantity: product.quantity,
    }));
    await this.db.saleProduct.createMany({
      data: result,
    });
  }

  async create(createSaleDto: CreateSaleDto) {
    try {
      const sale = await this.db.sale.create({
        data: {
          userId: createSaleDto.userId,
          sellerId: createSaleDto.sellerId,
          totalPrice: createSaleDto.totalPrice,
          deliveryAddress: createSaleDto.deliveryAddress,
          deliveryNumber: createSaleDto.deliveryNumber,
        },
      });
      await this.createSaleProduct(sale.id, createSaleDto.products);
      return sale;
    } catch (error) {
      throw new HttpException(
        'The sale could not be created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
