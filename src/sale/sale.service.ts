import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
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
    return this.db.sale.findMany();
  }

  findOne(id: string) {
    return this.db.sale.findUnique({ where: { id } });
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    try {
      return this.db.sale.update({ where: { id }, data: updateSaleDto });
    } catch (error) {
      throw new NotFoundException('Sale not found');
    }
  }

  remove(id: string) {
    try {
      return this.db.sale.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Sale not found');
    }
  }
}
