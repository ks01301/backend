import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: ' 자동생성' })
  id: number;
  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: '생성시간',
  })
  createDateAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    comment: '업데이트 시간',
  })
  updateDateAt: Date;
}
