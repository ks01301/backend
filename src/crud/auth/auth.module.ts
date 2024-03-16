import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberEntity } from 'src/databases/entities/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';

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
  controllers: [AuthController],
  providers: [AuthService, JwtModule, JwtStrategy],
})
export class AuthModule {}
