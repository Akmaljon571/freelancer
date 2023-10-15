import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegistrAuthDto } from './dto/registr-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IReturnMsg, IReturnToken } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginAuthDto): Promise<IReturnMsg> {
    return this.authService.login(body);
  }

  @Get('/login/:code')
  @HttpCode(HttpStatus.OK)
  loginCode(@Param('code') code: string): Promise<IReturnToken> {
    return this.authService.loginCode(code);
  }

  @Post('/registr')
  @HttpCode(HttpStatus.OK)
  registr(@Body() body: RegistrAuthDto): Promise<IReturnMsg> {
    return this.authService.registr(body);
  }

  @Get('/registr/:code')
  @HttpCode(HttpStatus.CREATED)
  registrCode(@Param('code') code: string): Promise<IReturnToken> {
    return this.authService.registrCode(code);
  }

  // @Get('/token')
  // token(@Req() req: Request) {
  //   return this.authService.token(req);
  // }
}
