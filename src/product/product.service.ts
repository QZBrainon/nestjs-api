import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private db: PrismaService) {}

  async getAllProducts() {
    return await this.db.product.findMany();
  }

  async createProduct(product: CreateProductDto) {
    try {
      const createdProduct = await this.db.product.create({
        data: {
          name: product.name,
          price: product.price,
          urlImage: product.urlImage,
        },
      });
      return createdProduct;
    } catch (error) {
      throw new NotFoundException('Could not register new product');
    }
  }

  async updateProduct(id: string, newProduct: UpdateProductDto) {
    try {
      const product = await this.db.product.update({
        where: { id },
        data: {
          name: newProduct.name,
          price: newProduct.price,
          urlImage: newProduct.urlImage,
        },
      });
      return product;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}
