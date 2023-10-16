import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Skills } from '@prisma/client';
import { EmployeeSkillsDTO } from './dto/create.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Skills[]> {
    return await this.prisma.skills.findMany();
  }

  async findOne(search: string): Promise<Skills> {
    const findMany = await this.prisma.skills.findMany();

    return findMany.find((e) => e.skill.includes(search));
  }

  async create({ employee_id, skill_id }: EmployeeSkillsDTO): Promise<void> {
    try {
      await this.prisma.employeeSkills.create({
        data: {
          employee_id,
          skill_id,
        },
      });
    } catch (err) {
      throw new NotFoundException('Employee or Skills not found');
    }
  }
}
