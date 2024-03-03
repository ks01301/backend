import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './entities/member.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  findAll() {
    return `This action returns all test`;
  }

  async idCheck(memberId: string) {
    const idCheck = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    if (idCheck) {
      return true;
    } else {
      return false;
    }
  }

  async passwordCheck(loginDto: LoginDto) {
    const originpassword = await this.memberRepository.findOne({
      where: { id: loginDto.id },
      select: ['password'],
    });

    const passwordCheck = await bcrypt.compare(
      loginDto.password,
      originpassword.password,
    );
    console.log('password : ' + passwordCheck);

    if (passwordCheck) {
      return true;
    } else {
      return false;
    }
  }

  async createMember(memberCreateDto) {
    memberCreateDto.password = await bcrypt.hash(memberCreateDto.password, 10);
    return await this.memberRepository.save(memberCreateDto);
  }

  async login() {
    return '로그인 성공!';
  }
}
