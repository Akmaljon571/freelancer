import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkDto } from './create-work.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
  @ApiProperty({
    type: String,
    example: 'Single Page Web Site',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: String,
    example: '1 month',
  })
  @IsOptional()
  @IsString()
  term: string;

  @ApiProperty({
    type: String,
    example: '123 000',
  })
  @IsOptional()
  @IsString()
  price: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  file_and_link: string;

  @ApiProperty({
    type: String,
    example: 'California',
  })
  @IsOptional()
  @IsString()
  desctiption: string;
}
