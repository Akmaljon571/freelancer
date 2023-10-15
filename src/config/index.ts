import { ConfigModuleOptions } from '@nestjs/config';
import { dbConfig } from './database';
import { appConfig } from './app';
import { tokenConfig } from './token';
import { redisConfig } from './cache';

export const config: ConfigModuleOptions = {
  load: [appConfig, dbConfig, tokenConfig, redisConfig],
  cache: true,
  isGlobal: true,
};
