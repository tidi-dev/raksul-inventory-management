import { CreateInventoryDto } from '@/common/dtos';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class InventoryRepository extends BaseRepository {
  async createInventory({
    product_model_id,
    imei,
    configuration,
    price,
    quantity,
  }: CreateInventoryDto): Promise<void> {
    await this.prisma.inventory.create({
      data: {
        price,
        quantity,
        product_variant: {
          create: {
            product_model: {
              connect: {
                id: product_model_id,
              },
            },
            imei,
            configuration: {
              connect: {
                configuration_unique_key: configuration,
              },
            },
          },
        },
      },
    });
  }
}
