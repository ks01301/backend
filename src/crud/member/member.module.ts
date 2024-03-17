import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../../databases/entities/member.entity';
import { MemberService } from './member.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [MemberController],
  providers: [MemberService, JwtService],
})
export class MemberModule {}
