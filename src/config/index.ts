import { ConfigModuleOptions } from '@nestjs/config';
import { dbConfig } from './database';
import { appConfig } from './app';

export const config: ConfigModuleOptions = {
  load: [appConfig, dbConfig],
  cache: true,
  isGlobal: true,
};
