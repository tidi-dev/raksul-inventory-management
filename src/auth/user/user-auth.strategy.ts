import { comparePassword } from '@/common/functions';
import { UserRepository } from '@/common/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class UserLocalAuthStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private userRepository: UserRepository) {
    super({ usernameField: 'phone_number' });
  }

  async validate(phone_number: string, password: string) {
    const user = await this.userRepository.findByPhoneNumber(phone_number);
    const isValidPassword = await comparePassword(password, user?.password);

    if (!user || !isValidPassword) {
      throw new BadRequestException();
    }

    return user;
  }
}
