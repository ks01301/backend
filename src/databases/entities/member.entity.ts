import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'member' })
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '유저 고유 번호, 자동생성' })
  userNumber: number;

  @Column({ unique: true, comment: '아이디' })
  id: string;

  @Column({ comment: '비밀번호' })
  password: string;

  @Column({ comment: '이름' })
  name: string;

  @Column({ comment: '이메일' })
  email: string;

  @Column({ nullable: true, comment: '전화번호' })
  phone: string;

  @Column({ nullable: true, comment: '주소' })
  address: string;

  @Column({ nullable: true, comment: '상세 주소' })
  detailAddress: string;

  @Column({ default: true, comment: '계정 활성화 여부' })
  isActive: boolean;

  @Column({ nullable: true, comment: 'jwt refrsh token' })
  currentRefreshToken: string;

  @Column({ type: 'timestamptz', nullable: true, comment: 'jwt refresh exp' })
  currentRefreshTokenExp: Date;
}
