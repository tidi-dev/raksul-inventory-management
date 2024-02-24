import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProductVariantRepository extends BaseRepository {
  async findUniqueEmei(imei: string): Promise<ProductVariant> {
    return this.prisma.productVariant.findUnique({
      where: {
        imei,
      },
    });
  }
}
