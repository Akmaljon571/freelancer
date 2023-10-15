import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Who } from '../types';

export class RegistrAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    type: String,
    example: '2004-03-08',
  })
  @IsString()
  date_of_birth: string;

  @ApiProperty({
    type: String,
    example: 'ABC123',
  })
  @IsString()
  passport_series: string;

  @ApiProperty({
    type: String,
    example: '+998901234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    type: String,
    example: 'ahmadjonovakmal079@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    type: String,
    example: 'California',
  })
  @IsString()
  state: string;

  @ApiProperty({
    type: String,
    example: 'Los Angeles',
  })
  @IsString()
  city: string;

  @ApiProperty({
    enum: Who,
    type: Who,
    example: 'Employee',
  })
  @IsEnum(Who)
  who: Who;

  @ApiProperty({
    type: String,
    example: 'https://example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({
    type: String,
    example: 'A brief description of the user',
  })
  @IsString()
  @IsOptional()
  about_me: string;

  @ApiProperty({
    type: String,
    example: 'Web Development',
  })
  @IsString()
  @IsOptional()
  general_skill: string;
}
