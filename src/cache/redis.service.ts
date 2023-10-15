import { Injectable } from '@nestjs/common';
import { RedisService as NestJsRedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisService {
  constructor(private readonly nestJsRedisService: NestJsRedisService) {}

  async set(key: string, value: any): Promise<void> {
    const client = this.nestJsRedisService.getClient();
    await client.set(key, JSON.stringify(value));
  }

  async del(key: string) {
    const client = this.nestJsRedisService.getClient();
    await client.del(key);
  }

  async get(key: string): Promise<string | null> {
    const client = this.nestJsRedisService.getClient();
    return JSON.parse(await client.get(key));
  }
}
