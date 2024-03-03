import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './entities/member.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto, UpdateDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  findAll() {
    return `This action returns all test`;
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
      throw new Error('이미 존재하는 아이디입니다.');
    } else {
      memberCreateDto.password = await bcrypt.hash(
        memberCreateDto.password,
        10,
      );
      return await this.memberRepository.save(memberCreateDto);
    }
  }

  async updatemember(updateDto: UpdateDto) {
    const data = { ...updateDto };

    delete data.id;
    delete data.password;

    for (const key in data) {
      if (data[key] === null || data[key] === undefined || data[key] === '') {
        delete data[key];
      }
    }
    console.log(data);
    return await this.memberRepository.update({ id: updateDto.id }, data);
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
        throw new UnauthorizedException('비밀번호가 틀렸습니다.');
      }
    } else {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }
  }
}
