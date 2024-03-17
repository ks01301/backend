import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemberCreateDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  detailAddress: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  grade: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  detailAddress: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  grade: string;
}
