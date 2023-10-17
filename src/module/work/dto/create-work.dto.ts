import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWorkDto {
  @ApiProperty({
    type: String,
    example: 'Single Page Web Site',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: '1 month',
  })
  @IsString()
  term: string;

  @ApiProperty({
    type: String,
    example: '123 000',
  })
  @IsString()
  price: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  file_and_link: string;

  @ApiProperty({
    type: String,
    example: 'California',
  })
  @IsString()
  description: string;
}
