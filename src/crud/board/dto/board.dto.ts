import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  category: string;
}

export class UpdateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
