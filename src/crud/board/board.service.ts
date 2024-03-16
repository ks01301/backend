import { Injectable } from '@nestjs/common';
import { BoardEntity } from '../../databases/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { MemberService } from '../member/member.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class BoardService {
  constructor(
    private memberService: MemberService,
    private readonly commonService: CommonService,
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async list(boardId: number) {
    const result = await this.boardRepository.findOne({ where: { boardId } });
    console.log(result);

    if (result === null || result === undefined)
      return { status: 200, message: '없는 게시판입니다' };
    else return { status: 200, message: '게시판 불러오기 성공', data: result };
  }

  async write(userId: any, board: CreateBoardDto) {
    console.log(userId);
    const sendBoard: any = { ...board, userId };
    sendBoard.date = new Date();
    sendBoard.editDate = new Date();

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

  async delete(userId: string, boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { boardId },
    });

    if (!board) return { status: 400, message: '없는 게시판' };

    if (board.userId === userId) {
      this.boardRepository.delete({ boardId });
      return {
        status: 200,
        message: '게시글 삭제 성공',
      };
    } else
      return {
        status: 400,
        message: '작성자가',
      };
  }
  async test() {
    return await this.commonService.test();
  }
}
