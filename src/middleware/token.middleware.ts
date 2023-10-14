import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../token/jwt.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const path = req.params[0];

    if (path === 'auth/login' || path === 'auth/registr') {
      next();
    } else if (path === 'auth/token') {
      try {
        const token = req.headers.refresh;
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
      const bearer = req.headers.authorization;
      const token = bearer.split('Bearer ')[1];
      if (token || typeof token === 'string') {
        const verify: any = this.jwt.AccesVerify(token);
        try {
          // const verifyUser = await this.prisma.users.findUnique({
          //   where: { name: verify.name, password: verify.password },
          // });

          req.user_id = verify.id;
          next();
        } catch (error) {
          throw new BadRequestException('Bad Request in Token');
        }
      } else {
        throw new BadRequestException('Invalid or missing token');
      }
    }
  }
}
