import { SaleProduct } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  sellerId: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  deliveryNumber: string;

  @IsNotEmpty()
  @IsArray()
  products: SaleProduct[];

  @IsOptional()
  status?: 'Pendente' | 'Em Trânsito' | 'Preparando' | 'Entregue';
}
