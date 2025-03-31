import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthenticationService } from './authentication.service';
import { AUTH_TYPE } from './consts/auth-type.const';
import { Auth } from './decodators/auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Auth(AUTH_TYPE.None)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    // ToDo: We should not return 409 as it will expose that the user with the given e-mail already has an account (or should we?)
    return this.authenticationService.signUp(signUpDto);
  }

  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
    @Query('email') email: string,
  ) {
    if (!token || !email) {
      throw new BadRequestException(
        'Verification token and e-mail is required',
      );
    }
    await this.authenticationService.verifyEmailToken(token, email);
    return { message: 'Email verified successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.signIn(signInDto);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh-tokens')
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!request.cookies.refreshToken) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } =
      await this.authenticationService.refreshTokens({
        refreshToken: request.cookies.refreshToken,
      });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return { accessToken };
  }
}
