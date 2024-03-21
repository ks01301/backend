import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'light-date';
import { FilesEntity } from 'src/databases/entities/files.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly filesRepository: Repository<FilesEntity>,
  ) {}

  async fileUpload(files: Array<Express.Multer.File>) {
    const fileList = [];

    const path = format(new Date(), '{yyyy}{MM}{dd}');

    for await (const file of files) {
      const uploadFile = {
        file_id: file.filename,
        file_name: file.originalname,
        path,
      };

      await this.filesRepository.save(uploadFile);

      fileList.push({
        url: `http://localhost:5001/files/${file.filename}`,
      });
    }

    if (fileList.length === 0) {
      return {
        statusCode: 400,
        message: '업로드할 파일이 없습니다.',
      };
    }

    return {
      status: 200,
      message: '업로드 성공',
      data: fileList,
    };
  }

  async getFile(file: string) {
    const resFile = await this.filesRepository.findOne({
      where: { file_id: file },
    });

    return resFile;
  }

  async fileDelete(file_id: string) {
    console.log(file_id);
    const file = await this.filesRepository.findOne({ where: { file_id } });
    console.log(file);

    try {
      fs.unlinkSync(
        `${process.env.UPLOAD_DIRCTORY}/${file.path}/${file.file_id}`,
      );

      const data = await this.filesRepository.delete({ file_id });

      return { statusCode: 200, message: 'file delete success', data };
    } catch (err) {
      return { statusCode: 400, message: 'Error deleting file', data: err };
    }
  }
}
