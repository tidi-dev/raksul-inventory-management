import { UserRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniquePhoneNumber' })
export class UniquePhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepository) {}

  async validate(phone_number: string): Promise<boolean> {
    return !(await this.userRepository.findByPhoneNumber(phone_number));
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `Phone number ${validationArguments.value} is already existed`;
  }
}

export function UniquePhoneNumber(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: UniquePhoneNumberConstraint,
    });
  };
}
