import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

interface iResult {
  id: string;
  email: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  AccesSign(payload: iResult): string {
    const key = this.config.getOrThrow<string>('token.access_token');
    return jwt.sign(payload, key, { expiresIn: '30s' });
  }

  RefreshSign(payload: iResult): string {
    const key = this.config.getOrThrow<string>('token.refresh_token');
    return jwt.sign(payload, key, { expiresIn: '7d' });
  }

  AccesVerify(token: string) {
    const key = this.config.getOrThrow<string>('token.access_token');
    return jwt.verify(token, key, (err: Error, user: iResult) => {
      if (err) {
        throw new ForbiddenException('Forbidden token');
      }
      return user;
    });
  }

  RefreshVerify(token: string) {
    const key = this.config.getOrThrow<string>('token.refresh_token');
    return jwt.verify(token, key, (err: Error, user: iResult) => {
      if (err) {
        throw new ForbiddenException('Forbidden token');
      }
      return user;
    });
  }
}
