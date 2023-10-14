import { registerAs } from '@nestjs/config';

interface IApp {
  host: string;
  port: number;
}

export const appConfig = registerAs(
  'app',
  (): IApp => ({
    host: process.env.APP_HOST ? String(process.env.APP_HOST) : undefined,
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : undefined,
  }),
);
