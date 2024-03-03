import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginDto, MemberCreateDto } from './dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Post('create')
  async createMember(@Body() memberCreateDto: MemberCreateDto) {
    const idCheck = await this.memberService.idCheck(memberCreateDto.id);
    if (idCheck) {
      throw new Error('이미 존재하는 아이디 입니다.');
    } else {
      console.log('계정 생성 ㄱㄱ');
      return this.memberService.createMember(memberCreateDto);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const idCheck = await this.memberService.idCheck(loginDto.id);
    if (idCheck) {
      const passwordCheck = await this.memberService.passwordCheck(loginDto);
      if (passwordCheck) {
        return await this.memberService.login();
      } else {
        throw new Error('비밀번호가 틀렸습니다.');
      }
    } else {
      throw new Error('없는 아이디입니다.');
    }
  }
}
