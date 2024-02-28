import { UserRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingPhoneNumber' })
export class ExistingPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepository) {}

  async validate(phone_number: string): Promise<boolean> {
    return !!(await this.userRepository.findByPhoneNumber(phone_number));
  }

  defaultMessage() {
    return `Invalid credential`;
  }
}

export function ExistingPhoneNumber(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: ExistingPhoneNumberConstraint,
    });
  };
}
