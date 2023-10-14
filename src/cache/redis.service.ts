import { Injectable } from '@nestjs/common';
import { RedisService as NestJsRedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisService {
  constructor(private readonly nestJsRedisService: NestJsRedisService) {}

  async set(key: string, value: string): Promise<void> {
    const client = this.nestJsRedisService.getClient();
    await client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    const client = this.nestJsRedisService.getClient();
    return client.get(key);
  }
}
