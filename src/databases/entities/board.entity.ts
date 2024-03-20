import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'board' })
export class BoardEntity extends BaseEntity {
  @Column({ comment: '글 작성자 아이디' })
  member_id: string;

  @Column({ comment: '글 제목' })
  title: string;

  @Column({ comment: '글 본문' })
  content: string;

  @Column({ default: '', comment: '카테고리' })
  category: string;
}
