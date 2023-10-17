import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Skills } from '@prisma/client';
import { EmployeeSkillsDTO } from './dto/create.dto';
import { Request } from 'express';

@Controller('skills')
@ApiTags('Skills')
@ApiBearerAuth()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('/all')
  findAll(): Promise<Skills[]> {
    return this.skillsService.findAll();
  }

  @Get('/search')
  findOne(@Query('search') search: string): Promise<Skills> {
    return this.skillsService.findOne(search);
  }

  @Post('/employee_skills')
  create(@Body() body: EmployeeSkillsDTO, @Req() req: Request): Promise<void> {
    return this.skillsService.create(body, req.user_id);
  }

  @Delete('/employee_skills')
  delete(@Body() body: EmployeeSkillsDTO, @Req() req: Request): Promise<void> {
    return this.skillsService.delete(body, req.user_id);
  }
}
