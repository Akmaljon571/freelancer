import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class ErrorGlobalCatch implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    console.log(error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = error?.status;
    if (error instanceof HttpException) {
      response.status(status).json(error);
    } else {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  }
}
