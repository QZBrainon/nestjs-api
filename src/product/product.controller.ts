import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
