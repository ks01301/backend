import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '../auth/security/auth.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  @Post('/signin')
  async signIn(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.loginService.validateUser(body.id, body.password);

    const access_token = await this.loginService.generateAccessToken(
      user.id,
      user.grade,
    );

    const refresh_token = await this.loginService.generateRefreshToken(
      user.id,
      user.grade,
    );

    await this.loginService.setCurrentRefreshToken(refresh_token, user.id);

    res.setHeader('Authorization', 'Bearer ' + [access_token, refresh_token]);
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });
    return {
      code: 200,
      message: 'login success',
      time: Date(),
      result: {
        id: user.id,
        graded: user.grade,
        access_token: access_token,
        refresh_token: refresh_token,
      },
    };
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const newAccessToken = (
        await this.loginService.refreshTocken(refreshTokenDto)
      ).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
      });
      res.send({ newAccessToken });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh-token');
    }
  }

  @Post('signout')
  async signOutMember(@Req() req: any, @Res() res: Response): Promise<any> {
    if (!req.cookies['access_token']) {
      return res.send({
        code: 1000,
        message: 'no access token',
        time: Date(),
      });
    }

    const user = await this.jwtService.verify(req.cookies['access_token'], {
      secret: process.env.JWT_SECRET,
    });

    await this.loginService.removeRefreshToken(user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.send({
      code: 200,
      message: 'logout success',
      time: Date(),
    });
  }

  @UseGuards(AuthGuard)
  @Get('')
  async memberList(@GetUser() user) {
    return user;
  }
}
