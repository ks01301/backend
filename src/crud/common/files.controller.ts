import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  Res,
  UploadedFiles,
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

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.filesService.getFile(filename);
    return res.sendFile(file.file_id, { root: `upload/${file.path}` });
  }

  @Get('download/:filename')
  async fileDownload(
    @Param('path') path: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const file = await this.filesService.getFile(filename);
    return res.download(`upload/${file.path}/${file.file_id}`, file.file_name);
  }
}
