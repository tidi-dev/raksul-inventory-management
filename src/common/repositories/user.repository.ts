import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterDto } from '../dtos';
import { encryptPhone, hashPassword } from '../functions';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  async findByPhoneNumber(phone_number: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        phone_number: encryptPhone(phone_number),
      },
    });
  }

  async updateTheLatestSignInTime(
    phone_number: string,
  ): Promise<Partial<User>> {
    return this.prisma.user.update({
      where: {
        phone_number: encryptPhone(phone_number),
      },
      data: {
        last_login_at: new Date().toISOString(),
      },
      select: {
        full_name: true,
        phone_number: true,
        last_login_at: true,
      },
    });
  }

  async createUser({
    full_name,
    password,
    phone_number,
  }: RegisterDto): Promise<Partial<User>> {
    return this.prisma.user.create({
      data: {
        full_name,
        phone_number: encryptPhone(phone_number),
        password: hashPassword(password),
      },
      select: {
        full_name: true,
        phone_number: true,
        last_login_at: true,
      },
    });
  }
}
