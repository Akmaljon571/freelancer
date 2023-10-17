import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployerDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  full_name: string;

  @ApiProperty({
    type: String,
    example: '2004-03-08',
  })
  @IsString()
  @IsOptional()
  date_of_birth: string;

  @ApiProperty({
    type: String,
    example: 'ABC123',
  })
  @IsOptional()
  @IsString()
  passport_series: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    example: 'California',
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    type: String,
    example: 'Los Angeles',
  })
  @IsString()
  @IsOptional()
  city: string;
}
