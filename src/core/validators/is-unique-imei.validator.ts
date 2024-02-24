import { ProductVariantRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueImei' })
export class UniqueImeiConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  async validate(imei: string): Promise<boolean> {
    return !(await this.productVariantRepository.findUniqueEmei(imei));
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `Imei ${validationArguments.value} is already existed`;
  }
}

export function UniqueImei(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: UniqueImeiConstraint,
    });
  };
}
