import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { AuthGuard } from '../auth/security/auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get('list')
  list() {
    return this.boardService.list(null);
  }
  @Get('list/:boardId')
  listGet(@Param('boardId') boardId: number) {
    return this.boardService.list(boardId);
  }

  @UseGuards(AuthGuard)
  @Post('craeteboard')
  write(@GetUser() user, @Body() body: CreateBoardDto) {
    console.log(user);
    return this.boardService.write(user.id, body);
  }

  @Patch(':boardId')
  update(@Param('boardId') boardId: number, @Body() body: UpdateBoardDto) {
    return this.boardService.update(boardId, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':boardId')
  delete(@GetUser() user, @Param('boardId') boardId: number) {
    return this.boardService.delete(user, boardId);
  }

  @Get()
  test() {
    return this.boardService.test();
  }
}
