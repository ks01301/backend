import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'board' })
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '게시글 고유 번호' })
  boardId: number;

  @Column({ comment: '글 작성자 아이디' })
  userId: string;

  @Column({ comment: '글 제목' })
  title: string;

  @Column({ comment: '글 본문' })
  content: string;

  // @Column({ default: new Date() })
  // date: Date;

  // @Column()
  // editDate: Date;

  @Column({ default: '', comment: '카테고리' })
  kategorie: string;
}
