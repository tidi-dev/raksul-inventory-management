import { PHONE_NUMBER_REGEX } from '@/common/constants';
import { ExistingPhoneNumber } from '@/core/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @ExistingPhoneNumber()
  @Matches(PHONE_NUMBER_REGEX, {
    message: 'phone_number is NOT valid Vietnamese phone number format',
  })
  phone_number: string;

  @ApiProperty({ example: 'p@ssword123' })
  @IsNotEmpty()
  password: string;
}
