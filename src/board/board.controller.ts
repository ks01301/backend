import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    // private readonly memberService: MemberService,
  ) {}

  @Get('list')
  list() {
    return this.boardService.list(null);
  }
  @Get('list/:boardId')
  listGet(@Param('boardId') boardId: number) {
    return this.boardService.list(boardId);
  }

  @Post('craeteboard')
  write(@Body() body: CreateBoardDto) {
    // const idCheck = this.memberService.idCheck(body.id);
    // if (idCheck) {
    //   console.log(idCheck);
    // } else {
    //   console.log(idCheck);
    // }
    return this.boardService.write(body);
  }

  @Patch(':boardId')
  update(@Param('boardId') boardId: number, @Body() body: UpdateBoardDto) {
    return this.boardService.update(boardId, body);
  }

  @Delete(':boardId')
  delete(@Param('boardId') boardId: number) {
    return this.boardService.delete(boardId);
  }
}
