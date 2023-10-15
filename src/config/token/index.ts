import { registerAs } from '@nestjs/config';

interface IToken {
  access_token: string;
  refresh_token: string;
}

export const tokenConfig = registerAs(
  'token',
  (): IToken => ({
    access_token: process.env.ACCES_TOKEN
      ? String(process.env.ACCES_TOKEN)
      : undefined,
    refresh_token: process.env.REFRESH_TOKEN
      ? String(process.env.REFRESH_TOKEN)
      : undefined,
  }),
);
