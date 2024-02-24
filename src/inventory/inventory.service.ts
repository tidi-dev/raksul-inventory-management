import { CreateInventoryDto } from '@/common/dtos';
import { InventoryRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  create(createInventoryDto: CreateInventoryDto): void {
    this.inventoryRepository.createInventory(createInventoryDto);
  }
}
