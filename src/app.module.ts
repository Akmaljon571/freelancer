import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from './token/jwt.module';
import { RedisCoreModule } from './cache/redis-core.module';
import { TokenMiddleWare } from './middleware/token.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    AuthModule,
    ChatModule,
    PrismaModule,
    JwtModule,
    RedisCoreModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleWare)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/registr', method: RequestMethod.POST },
        { path: 'auth/login/:code', method: RequestMethod.GET },
        { path: 'auth/registr/:code', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
