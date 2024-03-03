import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginDto, MemberCreateDto, UpdateDto } from './dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Post('signup')
  async createMember(@Body() memberCreateDto: MemberCreateDto) {
    return this.memberService.createMember(memberCreateDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.memberService.login(loginDto);
  }

  @Post('updatemember')
  async update(@Body() updateDto: UpdateDto) {
    return await this.memberService.update(updateDto);
  }
}
