import { Module } from '@nestjs/common';
import { MemberEntity } from 'src/databases/entities/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        // secret: process.env.JWT_SECRET,
        secret: 'lxmeISECRET',
        signOptions: { expiresIn: process.env.JWT_EXP },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  // ! JwtStrategy 에러나면 privider에 추가
  providers: [JwtModule],
})
export class AuthModule {}
