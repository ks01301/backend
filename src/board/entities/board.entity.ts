import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Board {}

@Entity({ name: 'board' })
export class BoardEntity {
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
