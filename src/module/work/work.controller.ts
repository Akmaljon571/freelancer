import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from '@prisma/client';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('work')
@ApiTags('Work')
@ApiBearerAuth()
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  create(
    @Body() createWorkDto: CreateWorkDto,
    @Req() req: Request,
  ): Promise<void> {
    return this.workService.create(createWorkDto, req.user_id);
  }

  @Get()
  findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
    @Req() req: Request,
  ) {
    return this.workService.update(id, updateWorkDto, req.user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    return this.workService.remove(id, req.user_id);
  }
}
