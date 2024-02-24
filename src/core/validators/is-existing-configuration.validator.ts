import { ConfigurationDto } from '@/common/dtos';
import { ConfigurationRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import type {
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingConfiguration' })
export class ExistingConfigurationConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
  ) {}

  async validate(configuration: ConfigurationDto): Promise<boolean> {
    return !!(await this.configurationRepository.findUniqueConfiguration(
      configuration,
    ));
  }

  defaultMessage() {
    return `Invalid configuration`;
  }
}

export function ExistingConfiguration(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: ExistingConfigurationConstraint,
    });
  };
}
