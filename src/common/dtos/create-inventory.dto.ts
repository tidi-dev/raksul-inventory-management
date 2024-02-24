import {
  ExistingConfiguration,
  ExistingId,
  UniqueImei,
} from '@/core/validators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ConfigurationDto {
  @ApiProperty()
  @IsInt()
  ram: number;

  @ApiProperty()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  storage_capacity: string;

  @ApiProperty()
  @IsNotEmpty()
  os_version: string;
}
export class CreateInventoryDto {
  @ApiProperty()
  @ExistingId('productModel', {
    message: (_) => `product model id ${_.value} is NOT found`,
  })
  @IsUUID()
  product_model_id: string;

  @ApiProperty()
  @UniqueImei()
  @IsNotEmpty()
  imei: string;

  @ApiProperty()
  @ExistingConfiguration()
  @ValidateNested({ each: true })
  @Type(() => ConfigurationDto)
  @IsNotEmptyObject()
  @IsObject()
  configuration: ConfigurationDto;

  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsPositive()
  quantity: number;
}
