import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from '../member/member.service';
import { MemberEntity } from '../../databases/entities/member.entity';
import { CommonService } from '../common/common.service';
import { JwtService } from '@nestjs/jwt';
import { BoardEntity } from 'src/databases/entities/board.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, MemberEntity]),
    MulterModule.register({ dest: '../../upload' }),
  ],
  controllers: [BoardController],
  providers: [BoardService, MemberService, CommonService, JwtService],
})
export class BoardModule {}
