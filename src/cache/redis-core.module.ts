import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from './redis.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCoreModule {}
