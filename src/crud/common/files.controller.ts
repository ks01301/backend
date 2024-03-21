import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  Res,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.filesService.fileUpload(files);
  }

  // * filename은 다운로드 받는 파일명

  @Get(':file_id')
  async getFile(@Param('file_id') file_id: string, @Res() res: Response) {
    const file = await this.filesService.getFile(file_id);
    return res.sendFile(file.file_id, { root: `upload/${file.path}` });
  }

  @Get('download/:file_id')
  async fileDownload(
    @Param('path') path: string,
    @Param('file_id') file_id: string,
    @Res() res: Response,
  ) {
    const file = await this.filesService.getFile(file_id);

    return res.download(`upload/${file.path}/${file.file_id}`, file.file_name);
  }
  @Delete(':file_id')
  async fileDelete(@Param('file_id') file_id: string) {
    return this.filesService.fileDelete(file_id);
  }
}
