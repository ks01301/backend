// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Payload } from './payload.interface';
// import { MemberEntity } from 'src/databases/entities/member.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(MemberEntity)
//     private readonly memberRepository: Repository<MemberEntity>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: process.env.JWT_SECRET || false,
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(payload: Payload) {
//     console.log('11111111111111111');
//     const user = await this.memberRepository.findOne({
//       select: ['id'],
//       where: { id: payload.id },
//     });

//     if (user) {
//       return user;
//     }

//     if (!user) {
//       throw new UnauthorizedException('유효하지 않은 토큰입니다.', '401');
//     }
//   }
// }
