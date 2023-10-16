import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiTags } from '@nestjs/swagger';
import { Skills } from '@prisma/client';
import { EmployeeSkillsDTO } from './dto/create.dto';

@Controller('skills')
@ApiTags()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll(): Promise<Skills[]> {
    return this.skillsService.findAll();
  }

  @Get()
  findOne(@Query('search') search: string): Promise<Skills> {
    return this.skillsService.findOne(search);
  }

  @Post('/employee_skills')
  create(@Body() body: EmployeeSkillsDTO): Promise<void> {
    return this.skillsService.create(body);
  }
}
