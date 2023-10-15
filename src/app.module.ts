import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from './token/jwt.module';
import { RedisCoreModule } from './cache/redis-core.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    AuthModule,
    ChatModule,
    PrismaModule,
    JwtModule,
    RedisCoreModule,
  ],
})
export class AppModule {}
