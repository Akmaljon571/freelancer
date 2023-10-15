import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({
    example: 'ahmadjonovakmal079@gmail.com',
  })
  email: string;
}
