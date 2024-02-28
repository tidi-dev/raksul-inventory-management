import type { LoginDto, RegisterDto } from '@/common/dtos';
import { decryptPhone } from '@/common/functions';
import { UserRepository } from '@/common/repositories';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login({ phone_number }: LoginDto) {
    const user =
      await this.userRepository.updateTheLatestSignInTime(phone_number);
    return {
      access_token: this.jwtService.sign({ phone_number }),
      user: {
        ...user,
        phone_number: decryptPhone(user.phone_number),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.createUser(registerDto);

    return {
      access_token: this.jwtService.sign({ user }),
      user: {
        ...user,
        phone_number: decryptPhone(user.phone_number),
      },
    };
  }
}
