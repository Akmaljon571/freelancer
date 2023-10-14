import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: 'mypass',
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCoreModule {}
