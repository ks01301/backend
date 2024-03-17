import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from './dto/login.dto';
import { MemberEntity } from 'src/databases/entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Payload } from '../auth/security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(id, password) {
    const user = await this.memberRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user Not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password!');
    }

    return user;
  }

  async generateAccessToken(id: string, grade: string) {
    const payload: Payload = {
      id,
      grade,
    };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXP,
    });
  }

  async generateRefreshToken(id: string, grade: string) {
    const payload: Payload = {
      id,
      grade,
    };
    return await this.jwtService.signAsync(payload, {
      secret: 'kCuLPyCLYydCYqn',
      // secret: process.env.JWT_REFRSH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXP,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentRefreshToken =
      await this.getCurrentHashedRefreshToken(refreshToken);
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();
    await this.memberRepository.update(
      { id },
      {
        currentRefreshToken,
        currentRefreshTokenExp,
      },
    );
  }

  async getCurrentHashedRefreshToken(refreshToken: string) {
    console.log(refreshToken);
    const saltOrRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    console.log(currentRefreshToken);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
    const currentRefreshTokenExp = new Date(
      currentDate.getTime() + parseInt(process.env.JWT_REFRESH_EXP),
    );
    return currentRefreshTokenExp;
  }

  async refreshTocken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto;

    // Verify refresh token
    // JWT Refresh Token 검증 로직
    const decodedRefreshToken = this.jwtService.verify(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    }) as Payload;

    // Check if user exists
    const userId = decodedRefreshToken.id;
    const userGrade = decodedRefreshToken.grade;
    console.log('userId', userId);
    const user = await this.getUserIfRefreshTokenMatches(refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    // Generate new access token
    const accessToken = await this.generateAccessToken(userId, userGrade);

    const new_refresh_token = await this.generateRefreshToken(
      userId,
      userGrade,
    );

    await this.setCurrentRefreshToken(new_refresh_token, user.id);

    return { accessToken };
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: string,
  ): Promise<MemberEntity> {
    const user: MemberEntity = await this.memberRepository.findOneBy({
      id,
    });

    // user에 currentRefreshToken이 없다면 null을 반환 (즉, 토큰 값이 null일 경우)
    if (!user.currentRefreshToken) {
      return null;
    }

    // 유저 테이블 내에 정의된 암호화된 refresh_token값과 요청 시 body에 담아준 refresh_token값 비교
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentRefreshToken,
    );

    // 만약 isRefreshTokenMatching이 true라면 user 객체를 반환
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: string): Promise<any> {
    return await this.memberRepository.update(
      { id },
      {
        currentRefreshToken: null,
        currentRefreshTokenExp: null,
      },
    );
  }
}
