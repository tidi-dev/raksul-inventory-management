import { BaseRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingId', async: false })
export class ExistingIdConstraint implements ValidatorConstraintInterface {
  constructor(private readonly baseRepo: BaseRepository) {}

  async validate(
    id: string,
    { constraints: [entity] }: ValidationArguments,
  ): Promise<boolean> {
    return await this.baseRepo.isExistingData(entity, { id });
  }
}

export function ExistingId(entity: string, options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [entity],
      validator: ExistingIdConstraint,
    });
  };
}
