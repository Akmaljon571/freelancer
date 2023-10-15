import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../token/jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import { Who } from '../module/auth/types';

@Injectable()
export class TokenMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const path = req.params[0];
    const token = req.headers.authorization;
    const accessToken = token?.split('Bearer ')[1];

    if (path === 'auth/token') {
      try {
        if (token && typeof token === 'string') {
          req.token = token;
          next();
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new ForbiddenException('Invalid or missing Authorization header');
      }
    } else {
      if (accessToken || typeof accessToken === 'string') {
        const verify: any = this.jwt.AccesVerify(token);
        try {
          if (verify.role === Who.employee) {
            const verifyUser = await this.prisma.employee.findUnique({
              where: { id: verify.id, email: verify.email },
            });

            req.user_id = verifyUser.id;
            next();
          } else if (verify.role === Who.employer) {
            const verifyUser = await this.prisma.employer.findUnique({
              where: { id: verify.id, email: verify.email },
            });

            req.user_id = verifyUser.id;
            next();
          } else {
            throw new Error();
          }
        } catch (error) {
          throw new BadRequestException('Bad Request in Token');
        }
      } else {
        throw new BadRequestException('Invalid or missing token');
      }
      next();
    }
  }
}
