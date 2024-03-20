import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../baseEntity.ts/base.entity';

@Entity({ name: 'member' })
export class MemberEntity extends BaseEntity {
  @Column({ unique: true, comment: '아이디' })
  member_id: string;

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

  @Column({
    default: 'normal',
    nullable: true,
    comment: 'admin: 관리자, normal: 일반 유저',
  })
  grade: string;
}
