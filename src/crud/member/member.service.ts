import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto, UpdateDto } from './dto/member.dto';
import { MemberEntity } from '../../databases/entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

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

  async updatemember(id: string, updateData: UpdateDto) {
    const user = await this.memberRepository.findOne({ where: { id } });

    if (!user) return { status: 404, message: '존재하지 않는 아이디' };

    try {
      const result = await this.memberRepository.update({ id }, updateData);
      if (result.affected === 0)
        return { status: 400, message: '업데이트 실패' };
      return { status: 200, message: '수정 성공' };
    } catch (err) {
      console.log(err);
      return { status: 401, message: '수정 실패', result: err };
    }
  }

  async deletemember(id: string) {
    const idCheck = await this.idCheck(id);
    if (idCheck) {
      await this.memberRepository.delete({ id });
      return { status: 200, message: '아이디 삭제 성공' };
    } else {
      throw new UnauthorizedException({
        status: 401,
        message: '존재하지 않는 아이디',
      });
    }
  }
}
