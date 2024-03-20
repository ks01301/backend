import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateDto, UpdateDto } from './dto/member.dto';
import { AuthGuard } from '../auth/security/auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  async createMember(@Body() body: MemberCreateDto) {
    return this.memberService.createMember(body);
  }

  @Patch(':id')
  async updateMember(@Param('id') id: string, @Body() body: UpdateDto) {
    return await this.memberService.updateMember(id, body);
  }
  @Delete(':member_id')
  async deletemember(@Param('member_id') member_id: string) {
    return await this.memberService.deleteMember(member_id);
  }

  @UseGuards(AuthGuard)
  @Post('list')
  async memberList(@GetUser() user) {
    return await this.memberService.memberList(user, null);
  }
  @UseGuards(AuthGuard)
  @Post('list/:id')
  async memberAllList(@GetUser() user, @Param('id') member_id: string) {
    return await this.memberService.memberList(user, member_id);
  }
}
