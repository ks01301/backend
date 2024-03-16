import { Controller, Post, Body, Get, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './security/auth.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('loginget')
  loginget(@Query('id') id: string, @Query('password') password: string) {
    return this.authService.loginget(id, password);
  }

  @Get('/auth')
  @UseGuards(AuthGuard)
  auth(@GetUser() user: Request) {
    return user;
  }
}
