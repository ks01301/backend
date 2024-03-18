import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'light-date';
import { FilesEntity } from 'src/databases/entities/files.entity';
import { Repository } from 'typeorm';

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
        url: `http://localhost:5001/files/${path}/${file.filename}`,
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
}
