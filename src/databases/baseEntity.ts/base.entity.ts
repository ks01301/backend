import { CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ nullable: true, comment: '생성시간' })
  createDateAt: Date;
  @CreateDateColumn({ nullable: true, comment: '업데이트 시간' })
  updateAt: Date;
}
