import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'board' })
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: new Date() })
  date: Date;

  @Column()
  editDate: Date;
}
