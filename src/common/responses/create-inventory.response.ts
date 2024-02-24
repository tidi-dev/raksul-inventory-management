import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: {
    phone_number: string;
    last_login_at: string;
  };
}
