import { Controller, Get, Body, Patch, Param, Req } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employer } from '@prisma/client';

@Controller('employer')
@ApiTags('Employer')
@ApiBearerAuth()
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Get()
  findAll(): Promise<Employer[]> {
    return this.employerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employer> {
    return this.employerService.findOne(id);
  }

  @Get('/profile')
  profile(@Req() req: Request): Promise<Employer> {
    return this.employerService.findOne(req.user_id);
  }

  @Patch()
  update(
    @Req() req: Request,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ): Promise<void> {
    return this.employerService.update(req.user_id, updateEmployerDto);
  }
}
