import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';

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

  async update(id: string, body: UpdateDto): Promise<void> {
    try {
      await this.prisma.employee.update({ where: { id }, data: body });
    } catch (error) {
      throw new BadRequestException('Bad Request in Employee data');
    }
  }
}
