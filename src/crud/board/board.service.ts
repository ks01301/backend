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

  async list(boardId: number) {
    const result = await this.boardRepository.findOne({ where: { boardId } });
    console.log(result);

    if (result === null || result === undefined)
      return { status: 200, message: '없는 게시판입니다' };
    else return { status: 200, message: '게시판 불러오기 성공', data: result };
  }

  async write(board: CreateBoardDto) {
    const sendBoard: any = { ...board };
    sendBoard.date = new Date();
    sendBoard.editDate = new Date();
    // const result = await this.boardRepository.save(sendBoard);

    try {
      const result = await this.boardRepository.save(sendBoard);
      return {
        status: 200,
        message: '게시글 작성 성공',
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        message: '게시글 작성 실패',
        data: error,
      };
    }
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
    console.log(result.affected);
    if (result.affected !== 0)
      return {
        status: 200,
        message: '게시글 수정 완료',
        data: result,
      };
    else
      return {
        status: 400,
        message: '존재하지 않는 게시글',
      };
  }

  async delete(boardId: number) {
    return await this.boardRepository.delete({ boardId });
  }
  async test() {
    await this.memberService.test();
  }
}
