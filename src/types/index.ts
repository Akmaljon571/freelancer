// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { Who } from '../module/auth/types';

declare module 'express' {
  interface Request {
    token: string;
    user_id: string;
  }
}

export interface IToken {
  id: string;
  email: string;
  role: Who;
}
