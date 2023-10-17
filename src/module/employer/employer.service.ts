import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employer } from '@prisma/client';

@Injectable()
export class EmployerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employer[]> {
    return await this.prisma.employer.findMany();
  }

  async findOne(id: string): Promise<Employer> {
    try {
      return await this.prisma.employer.findUnique({
        where: { id },
        include: { work: true },
      });
    } catch (err) {
      throw new NotFoundException('Employer not found');
    }
  }

  async update(id: string, body: UpdateEmployerDto): Promise<void> {
    try {
      await this.prisma.employer.update({ where: { id }, data: body });
    } catch (error) {
      throw new BadRequestException('Bad Request in Employer data');
    }
  }
}
