import {
  BaseRepository,
  ConfigurationRepository,
  InventoryRepository,
  ProductVariantRepository,
} from '@/common/repositories';
import {
  ExistingConfigurationConstraint,
  ExistingIdConstraint,
  UniqueImeiConstraint,
} from '@/core/validators';
import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryService,
    ExistingConfigurationConstraint,
    ExistingIdConstraint,
    UniqueImeiConstraint,
    InventoryRepository,
    ConfigurationRepository,
    ProductVariantRepository,
    BaseRepository,
  ],
})
export class InventoryModule {}
