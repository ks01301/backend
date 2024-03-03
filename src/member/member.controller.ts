import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Post('updatemember')
  async updatemember(@Body() updateDto: UpdateDto) {
    return await this.memberService.updatemember(updateDto);
  }
  @Delete(':id')
  async deletemember(@Param('id') id: string) {
    return await this.memberService.deletemember(id);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.memberService.login(loginDto);
  }
}
