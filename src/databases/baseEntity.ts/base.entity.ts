import { CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: '생성시간',
  })
  createDateAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: '업데이트 시간',
  })
  updateDateAt: Date;
}
