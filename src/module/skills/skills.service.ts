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

  async create(
    { skill_id }: EmployeeSkillsDTO,
    employee_id: string,
  ): Promise<void> {
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

  async delete(
    { skill_id }: EmployeeSkillsDTO,
    employee_id: string,
  ): Promise<void> {
    try {
      const all = await this.prisma.employeeSkills.findMany();
      const find = all.find(
        (e) => e.employee_id === employee_id && e.skill_id === skill_id,
      );
      if (!find) {
        throw new NotFoundException('Employee or Skills not found');
      } else {
        await this.prisma.employeeSkills.delete({
          where: { id: find.id },
        });
      }
    } catch (err) {
      throw new NotFoundException('Employee or Skills not found');
    }
  }
}
