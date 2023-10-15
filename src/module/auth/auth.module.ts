import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../cache/redis.service';
import { JwtService } from '../../token/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RedisService, JwtService],
})
export class AuthModule {}
