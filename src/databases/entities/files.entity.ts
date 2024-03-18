import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'files' })
export class FilesEntity extends BaseEntity {
  @PrimaryColumn({ comment: '파일 고유 이름' })
  file_id: string;

  @Column({ comment: '파일명' })
  file_name: string;

  @Column({ comment: '파일 위치' })
  path: string;
}
