import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { format } from 'light-date';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from 'src/databases/entities/files.entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          const dest = `${process.env.UPLOAD_DIRCTORY}/${format(new Date(), '{yyyy}{MM}{dd}')}`;

          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }

          cb(null, dest);
        },
        filename(_, file, callback): void {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),

    TypeOrmModule.forFeature([FilesEntity]),
  ],
  controllers: [FilesController],
  providers: [CommonService, FilesService],
})
export class CommonModule {}
