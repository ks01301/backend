import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export class Member {}

@Entity({ name: 'member' })
@Unique(['id'])
export class MemberEntity {
  @PrimaryGeneratedColumn()
  userNumber: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  detailAddress: string;

  @Column({ default: true })
  isActive: boolean;
}
