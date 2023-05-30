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

  // async createSaleProduct(saleId: string, products: SaleProduct[]) {
  //   const result = products.map((product) => ({
  //     saleId,
  //     productId: product.productId,
  //     quantity: product.quantity,
  //   }));
  //   await this.db.saleProduct.createMany({
  //     data: result,
  //   });
  // }

  async create(createSaleDto: CreateSaleDto) {
    try {
      let result;
      await this.db.$transaction(async (tx) => {
        const sale = await tx.sale.create({
          data: {
            userId: createSaleDto.userId,
            sellerId: createSaleDto.sellerId,
            totalPrice: createSaleDto.totalPrice,
            deliveryAddress: createSaleDto.deliveryAddress,
            deliveryNumber: createSaleDto.deliveryNumber,
          },
        });
        const saleProducts = createSaleDto.products.map((product) => ({
          saleId: sale.id,
          productId: product.productId,
          quantity: product.quantity,
        }));
        await tx.saleProduct.createMany({
          data: saleProducts,
        });
        result = sale;
      });
      return result;
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

// sale creating dto
// {
//   "userId":"f6e6d6ff-8db1-49bf-a43b-e2e679b3c0f5",
//   "sellerId":"dde68652-c6fe-4692-9414-f0fad7fcfc19",
//   "totalPrice": 100,
//   "deliveryAddress":"Uma rua qualquer",
//   "deliveryNumber": "1000",
//   "products": [{"productId":"1408fdbc-f421-4f16-846c-bd69aa219b75", "quantity":10}, {"productId":"298e3cec-b556-48dc-8338-f724dc177080", "quantity":3},{"productId":"9978a485-de00-4f0e-ac75-aa100182b466", "quantity":15}]
// }
