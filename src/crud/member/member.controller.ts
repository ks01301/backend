import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginDto, MemberCreateDto, UpdateDto } from './dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  async createMember(@Body() body: MemberCreateDto) {
    return this.memberService.createMember(body);
  }

  @Patch(':id')
  async updatemember(@Param('id') id: string, @Body() body: UpdateDto) {
    return await this.memberService.updatemember(id, body);
  }
  @Delete(':id')
  async deletemember(@Param('id') id: string) {
    return await this.memberService.deletemember(id);
  }
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.memberService.login(body);
  }
}
