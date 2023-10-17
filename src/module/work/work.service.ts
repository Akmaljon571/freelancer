import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Work } from '@prisma/client';

@Injectable()
export class WorkService {
  constructor(private readonly prisma: PrismaService) {}

  async id(id: string): Promise<void> {
    try {
      await this.prisma.employer.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Employer Not Found');
    }
  }

  async create(
    { title, description, file_and_link, price, term }: CreateWorkDto,
    employer_id: string,
  ): Promise<void> {
    this.id(employer_id);
    try {
      await this.prisma.work.create({
        data: {
          title,
          description,
          file_and_link,
          price,
          term,
          employer_id,
        },
      });
    } catch (err) {
      throw new BadRequestException('Bad Request in work data');
    }
  }

  async findAll(): Promise<Work[]> {
    return await this.prisma.work.findMany();
  }

  async findOne(id: string): Promise<Work> {
    try {
      const a = await this.prisma.work.findUnique({
        where: { id },
        include: { petition: { include: { employee: true } } },
      });
      return a;
    } catch (err) {
      throw new NotFoundException('Work Not Found ');
    }
  }

  async update(
    id: string,
    body: UpdateWorkDto,
    employer_id: string,
  ): Promise<void> {
    this.id(employer_id);
    try {
      await this.prisma.work.update({ where: { id }, data: body });
    } catch (err) {
      throw new BadRequestException('Bad Request in Work data');
    }
  }

  async remove(id: string, employer_id: string): Promise<void> {
    this.id(employer_id);
    try {
      await this.prisma.work.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException('Work Not Found');
    }
  }
}
