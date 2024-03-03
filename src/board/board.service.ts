import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    // private memberRepository: Repository<MemberService>,
  ) {}

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

    return await this.boardRepository.save(sendBoard);
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

    return await this.boardRepository.update({ boardId }, sendBoard);
  }

  async delete(boardId: number) {
    return await this.boardRepository.delete({ boardId });
  }
}
