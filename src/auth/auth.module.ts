import { UserRepository } from '@/common/repositories';
import {
  ExistingPhoneNumberConstraint,
  UniquePhoneNumberConstraint,
} from '@/core/validators';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt/jwt-auth.strategy';
import { UserLocalAuthStrategy } from './user/user-auth.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserLocalAuthStrategy,
    JwtAuthStrategy,
    UserRepository,
    ExistingPhoneNumberConstraint,
    UniquePhoneNumberConstraint,
  ],
})
export class AuthModule {}
