import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employee[]> {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: string): Promise<Employee> {
    try {
      return await this.prisma.employee.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Employee Not Found');
    }
  }

  async search(search: string): Promise<Employee> {
    const findMany = await this.prisma.employee.findMany();

    return findMany.find((e) => e.full_name.includes(search));
  }
}
