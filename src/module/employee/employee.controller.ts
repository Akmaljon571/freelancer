import { Controller, Get, Param, Req, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Request } from 'express';
import { Employee } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
@ApiBearerAuth()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get('/all')
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Get('/profile')
  profile(@Req() req: Request) {
    return this.employeeService.findOne(req.user_id);
  }

  @Get('/search')
  saerch(@Query('search') search: string) {
    return this.employeeService.search(search);
  }
}
