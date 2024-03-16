import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../login/dto/login.dto';
import { AuthGuard } from './security/auth.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('/auth')
  @UseGuards(AuthGuard)
  auth(@GetUser() user: Request) {
    console.log(user);
    return user;
  }
}
