import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorGlobalCatch } from './catch';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorGlobalCatch());

  const config = app.get(ConfigService);
  const host = config.getOrThrow<string>('app.host');
  const port = config.getOrThrow<number>('app.port');
  console.log('Server Run: ' + port);
  await app.listen(port, host);
}
bootstrap();
