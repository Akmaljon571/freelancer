import { registerAs } from '@nestjs/config';

interface IRedis {
  url: string;
}

export const redisConfig = registerAs(
  'redis',
  (): IRedis => ({
    url: process.env.REDIR_URL ? String(process.env.REDIS_URL) : undefined,
  }),
);
