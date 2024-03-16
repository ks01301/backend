import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'src/databases/entities/member.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [LoginController],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
