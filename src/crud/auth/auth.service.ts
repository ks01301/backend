import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { Repository } from 'typeorm';
import { MemberEntity } from 'src/databases/entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const loginUser = await this.memberRepository.findOne({
      where: { id: body.id },
    });

    if (!loginUser)
      throw new UnauthorizedException({ status: 401, message: '없는 아이디' });
    else {
      const verifyPassword = await bcrypt.compare(
        body.password,
        loginUser.password,
      );

      if (!verifyPassword)
        throw new UnauthorizedException({
          status: 401,
          massage: '비밀번호 틀림',
        });
      else {
        const payload: Payload = { id: loginUser.id };
        const accessToken = this.jwtService.sign(payload);

        return {
          status: 201,
          message: '로그인 성공',
          result: {
            id: loginUser.id,
            accessToken,
          },
        };
      }
    }
  }
}
