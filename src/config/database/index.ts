import { registerAs } from '@nestjs/config';

interface IDB {
  url: string;
}

export const dbConfig = registerAs(
  'database',
  (): IDB => ({
    url: process.env.DATABASE_URL
      ? String(process.env.DATABASE_URL)
      : undefined,
  }),
);
