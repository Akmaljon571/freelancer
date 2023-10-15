import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../cache/redis.service';
import { random } from '../../utils/random';
import { JwtService } from '../../token/jwt.service';
import { RegistrAuthDto } from './dto/registr-auth.dto';
import sendMail from '../../utils/nodemailer';
import { IReturnMsg, IReturnToken, Who } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
  ) {}

  async login({ email }: LoginAuthDto): Promise<IReturnMsg> {
    const allEmployee = await this.prisma.employee.findMany();

    const findEmployee = allEmployee.find((e) => e.email === email);

    if (findEmployee) {
      const ran = random();
      await sendMail(findEmployee.email, ran);
      await this.redis.set(ran, {
        email: findEmployee.email,
        type: 'employee',
      });

      return {
        status: 200,
        message: 'Send Code in youMail',
      };
    } else {
      const allEmployer = await this.prisma.employer.findMany();
      const findEmployer = allEmployer.find((e) => e.email === email);

      if (findEmployer) {
        const ran = random();
        await sendMail(findEmployee.email, ran);
        await this.redis.set(ran, {
          email: findEmployee.email,
          type: 'employer',
        });

        return {
          status: 200,
          message: 'Send Code in youMail',
        };
      } else {
        throw new NotFoundException('Employee and Employer Not Found');
      }
    }
  }

  async loginCode(code: string): Promise<IReturnToken> {
    const redis: any = await this.redis.get(code);

    if (!redis) {
      throw new BadRequestException('Bad Request in code');
    }

    if (redis.type === 'employee') {
      const allEmployee = await this.prisma.employee.findMany();

      const findEmployee = allEmployee.find((e) => e.email === redis.email);
      this.redis.del(code);

      const access_token = this.jwt.AccesSign({
        id: findEmployee.id,
        email: findEmployee.email,
        role: Who.employee,
      });
      const refresh_token = this.jwt.RefreshSign({
        id: findEmployee.id,
        email: findEmployee.email,
        role: Who.employee,
      });
      this.redis.set(refresh_token, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    } else if (redis.type === 'employer') {
      const allEmployer = await this.prisma.employer.findMany();

      const findEmployer = allEmployer.find((e) => e.email === redis.email);
      this.redis.del(code);

      const access_token = this.jwt.AccesSign({
        id: findEmployer.id,
        email: findEmployer.email,
        role: Who.employer,
      });
      const refresh_token = this.jwt.RefreshSign({
        id: findEmployer.id,
        email: findEmployer.email,
        role: Who.employer,
      });

      return {
        access_token,
        refresh_token,
      };
    } else {
      throw new BadRequestException('Bad Request in code');
    }
  }

  async registr(body: RegistrAuthDto): Promise<IReturnMsg> {
    const allEmployee = await this.prisma.employee.findMany();

    const findEmployee = allEmployee.find((e) => e.email === body.email);

    if (findEmployee) {
      throw new ForbiddenException('user already has as an Employee');
    }

    const allEmployer = await this.prisma.employer.findMany();

    const findEmployer = allEmployer.find((e) => e.email === body.email);

    if (findEmployer) {
      throw new ForbiddenException('user already has as an Employer');
    }

    if (body.who === Who.employee) {
      try {
        const rand = random();
        await sendMail(body.email, rand);
        this.redis.set(rand, body);
        return {
          status: 200,
          message: 'Send Code in youMail',
        };
      } catch (error) {
        throw new BadRequestException('Error in Employee data');
      }
    } else {
      try {
        const rand = random();
        await sendMail(body.email, rand);
        this.redis.set(rand, body);
        return {
          status: 200,
          message: 'Send Code in youMail',
        };
      } catch (error) {
        throw new BadRequestException('Error in Employer data');
      }
    }
  }

  async registrCode(code: string): Promise<IReturnToken> {
    const redis: any = await this.redis.get(code);

    if (!redis) {
      throw new BadRequestException('Bad Request in code');
    }
    if (redis.who === Who.employee) {
      delete redis.who;
      const findEmployee = await this.prisma.employee.create({
        data: redis,
      });
      this.redis.del(code);

      const access_token = this.jwt.AccesSign({
        id: findEmployee.id,
        email: findEmployee.email,
        role: Who.employee,
      });
      const refresh_token = this.jwt.RefreshSign({
        id: findEmployee.id,
        email: findEmployee.email,
        role: Who.employee,
      });
      this.redis.set(refresh_token, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    } else if (redis.who === Who.employer) {
      delete redis.who;
      delete redis.website;
      delete redis.about_me;
      delete redis.general_skill;

      const findEmployer = await this.prisma.employer.create({
        data: redis,
      });
      this.redis.del(code);

      const access_token = this.jwt.AccesSign({
        id: findEmployer.id,
        email: findEmployer.email,
        role: Who.employer,
      });
      const refresh_token = this.jwt.RefreshSign({
        id: findEmployer.id,
        email: findEmployer.email,
        role: Who.employer,
      });

      return {
        access_token,
        refresh_token,
      };
    } else {
      throw new BadRequestException('Bad Request in code');
    }
  }

  async token(refresh_token: string) {
    try {
      const oldToken = await this.redis.get(refresh_token);
      if (!oldToken) {
        throw new Error();
      }
      const verifyUser: any = this.jwt.RefreshVerify(refresh_token);
      const access_token = this.jwt.AccesSign({
        id: verifyUser.id,
        email: verifyUser.email,
        role: verifyUser.role,
      });

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new BadRequestException('Bad Request in Token');
    }
  }
}
