import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto, UpdateDto } from './dto/member.dto';
import { MemberEntity } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  findAll() {
    return `${process.env.SERVER_PORT}번으로 서비스중`;
  }

  async idCheck(id: string) {
    const idCheck = await this.memberRepository.findOne({
      where: { id },
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

    if (passwordCheck) {
      return true;
    } else {
      return false;
    }
  }

  async createMember(memberCreateDto) {
    const idCheck = await this.idCheck(memberCreateDto.id);
    if (idCheck) {
      return {
        status: 400,
        message: 'Member already exists',
      };
    } else {
      memberCreateDto.password = await bcrypt.hash(
        memberCreateDto.password,
        10,
      );
      const result = await this.memberRepository.save(memberCreateDto);
      return { status: 200, message: '계정 생성 완료', data: result };
    }
  }

  async updatemember(id: string, updateDto: UpdateDto) {
    const data = { ...updateDto };

    for (const key in data) {
      if (data[key] === null || data[key] === undefined || data[key] === '') {
        delete data[key];
      }
    }
    console.log(data);
    return await this.memberRepository.update({ id }, data);
  }

  async deletemember(id: string) {
    const idCheck = await this.idCheck(id);
    if (idCheck) {
      return await this.memberRepository.delete({ id });
    } else {
      throw new UnauthorizedException('아이디 없음');
    }
  }

  async login(loginDto: LoginDto) {
    const idCheck = await this.idCheck(loginDto.id);
    if (idCheck) {
      const passwordCheck = await this.passwordCheck(loginDto);
      if (passwordCheck) {
        return '로그인 성공';
      } else {
        return { status: 401, message: '비밀번호가 틀렸습니다.' };
      }
    } else {
      return { status: 401, message: '존재하지 않는 아이디입니다.' };
    }
  }

  async test() {
    console.log('member service test');
    return 'asdfadf';
  }
}
