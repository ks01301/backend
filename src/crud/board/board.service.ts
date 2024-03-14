import { Injectable } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { MemberService } from '../member/member.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  @InjectRepository(BoardEntity)
  private boardRepository: Repository<BoardEntity>;
  constructor(private memberService: MemberService) {}

  list(boardId: number) {
    console.log(boardId);

    if (boardId === null || boardId === undefined) {
      return this.boardRepository.find();
    } else {
      return this.boardRepository.findOne({ where: { boardId } });
    }
  }

  async write(board: CreateBoardDto) {
    const sendBoard: any = { ...board };
    sendBoard.date = new Date();
    sendBoard.editDate = new Date();
    const result = await this.boardRepository.save(sendBoard);

    return {
      statusCode: 200,
      message: '게시글 작성 성공',
      data: result,
    };
  }

  async update(boardId: number, board: UpdateBoardDto) {
    const sendBoard: any = { ...board };

    for (const key in sendBoard) {
      if (
        sendBoard[key] === null ||
        sendBoard[key] === undefined ||
        sendBoard[key] === ''
      ) {
        delete sendBoard[key];
      }
    }
    sendBoard.editDate = new Date();

    const result = await this.boardRepository.update({ boardId }, sendBoard);

    return { statusCode: 200, message: '게시글 수정 완료', data: result };
  }

  async delete(boardId: number) {
    return await this.boardRepository.delete({ boardId });
  }
  async test() {
    await this.memberService.test();
  }
}
