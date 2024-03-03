import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardEntity } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { MemberEntity } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, MemberEntity])],
  controllers: [BoardController],
  providers: [BoardService, MemberService],
})
export class BoardModule {}
