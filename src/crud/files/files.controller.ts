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

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileList = [];

    files.forEach((file) => {
      fileList.push({
        url: `http://localhost:5001/files/${file.filename}`,
      });
    });

    return {
      status: 200,
      message: '업로드 성공',
      data: fileList,
    };
  }

  @Get(':filename')
  async getfile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: 'upload' });
  }
}
